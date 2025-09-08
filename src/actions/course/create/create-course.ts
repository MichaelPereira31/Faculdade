"use server";

import { CreateCourseResponseDTO } from "@/db/dtos/course/create-course-response-dto";
import CourseRepository from "@/db/Repositories/course-repository";
import { uploadImage } from "@/providers/storage";

interface CreateCourseRequest {
  name: string;
  description: string;
  imageUrl?: string;
  priceInCents: number;
  modules: Array<{
    name: string;
  }>;
}

interface CourseResponse {
  success: boolean;
  data?: CreateCourseResponseDTO;
  error?: string;
}

export async function createCourse(
  data: CreateCourseRequest,
): Promise<CourseResponse> {
  try {
    let imageUrl: string | null = null;

    const uploadResult = await uploadImage(data.imageUrl as string);

    if (!uploadResult.success) {
      return {
        success: false,
        error: uploadResult.error,
      };
    }

    imageUrl = uploadResult.imageUrl || null;

    const courseData = {
      name: data.name,
      description: data.description,
      imageUrl: imageUrl || null,
      priceInCents: data.priceInCents,
      courseContents: data.modules.map((module) => ({
        content: module.name,
      })),
    };

    const repository = CourseRepository.getInstance();

    const course = await repository.create(courseData);

    return {
      success: true,
      data: course,
    };
  } catch {
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}
