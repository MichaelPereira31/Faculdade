import prisma from "..";
import { CreateCourseContentDTO } from "../dtos/course-content/create-course-content-dto";
import UpdateCourseContentDTO from "../dtos/course-content/update-course-content-dto";
import CourseContentEntity from "../entities/course-content";

export default class CourseContentRepository {
  async findAll(): Promise<CourseContentEntity[]> {
    return await prisma.courseContent.findMany();
  }

  async create(data: CreateCourseContentDTO): Promise<CourseContentEntity> {
    return await prisma.courseContent.create({
      data,
    });
  }

  async update({
    id,
    ...data
  }: UpdateCourseContentDTO): Promise<CourseContentEntity> {
    return await prisma.courseContent.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.courseContent.delete({
      where: {
        id,
      },
    });
  }
}
