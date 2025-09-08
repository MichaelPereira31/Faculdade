import prisma from "..";
import { CreateCourseDTO } from "../dtos/course/create-course-dto";
import { CreateCourseResponseDTO } from "../dtos/course/create-course-response-dto";
import CourseEntity from "../entities/course";

export default class CourseRepository {
  private static instance: CourseRepository;

  private constructor() {}

  public static getInstance(): CourseRepository {
    if (!CourseRepository.instance) {
      CourseRepository.instance = new CourseRepository();
    }
    return CourseRepository.instance;
  }

  async findAll(): Promise<CourseEntity[]> {
    return await prisma.course.findMany({
      include: {
        courseContent: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  }

  async findById(id: string): Promise<CourseEntity | null> {
    return await prisma.course.findUnique({
      where: { id },
      include: {
        courseContent: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  }

  async create(data: CreateCourseDTO): Promise<CreateCourseResponseDTO> {
    const { courseContents, ...course } = data;

    const validatedContents = courseContents.map((content) => ({
      content: content.content ?? "",
    }));

    const createdCourse = await prisma.course.create({
      data: {
        ...course,
        courseContent: {
          create: validatedContents,
        },
      },
      include: {
        courseContent: true,
      },
    });

    return createdCourse as unknown as CreateCourseResponseDTO;
  }

  async update(
    id: string,
    data: {
      name: string;
      description: string;
      imageUrl: string;
      priceInCents: number;
    },
    modules: { id?: string; name: string }[],
  ): Promise<CourseEntity> {
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        priceInCents: data.priceInCents,
      },
      include: {
        courseContent: true,
      },
    });

    const existingModules = await prisma.courseContent.findMany({
      where: { courseId: id },
    });

    const modulesToDelete = existingModules.filter(
      (existingModule) =>
        !modules.some((module) => module.id === existingModule.id),
    );

    if (modulesToDelete.length > 0) {
      await prisma.courseContent.deleteMany({
        where: {
          id: { in: modulesToDelete.map((m) => m.id) },
        },
      });
    }

    for (const mod of modules) {
      if (mod.id) {
        await prisma.courseContent.update({
          where: { id: mod.id },
          data: { content: mod.name },
        });
      } else {
        await prisma.courseContent.create({
          data: {
            content: mod.name,
            courseId: id,
          },
        });
      }
    }

    return updatedCourse;
  }

  async delete(id: string): Promise<void> {
    await prisma.course.delete({
      where: { id },
    });
  }

  async searchByName(name: string): Promise<CourseEntity[]> {
    return await prisma.course.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      include: {
        courseContent: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByIdWithContents(id: string): Promise<CourseEntity | null> {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        courseContent: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!course) {
      return null;
    }

    return course;
  }

  async existsByName(name: string, excludeId?: string): Promise<boolean> {
    const count = await prisma.course.count({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    return count > 0;
  }
}

export const courseRepository = CourseRepository.getInstance();
