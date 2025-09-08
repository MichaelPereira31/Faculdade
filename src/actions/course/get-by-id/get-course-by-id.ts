"use server";

import CourseEntity from "@/db/entities/course";
import CourseRepository from "@/db/Repositories/course-repository";

interface GetCourseByIdResponse {
  success: boolean;
  data?: CourseEntity;
  error?: string;
}

export async function getCourseById(
  courseId: string,
): Promise<GetCourseByIdResponse> {
  try {
    const repository = CourseRepository.getInstance();

    const course = await repository.findByIdWithContents(courseId);

    if (!course) {
      return {
        success: false,
        error: "Curso não encontrado",
      };
    }

    return {
      success: true,
      data: course,
    };
  } catch {
    return {
      success: false,
      error: "Erro interno do servidor ao buscar curso",
    };
  }
}
