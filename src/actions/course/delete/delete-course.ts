"use server";

import CourseRepository from "@/db/Repositories/course-repository";

interface DeleteCourseResponse {
  success: boolean;
  error?: string;
}

export async function deleteCourse(
  courseId: string,
): Promise<DeleteCourseResponse> {
  try {
    const repository = CourseRepository.getInstance();
    const course = await repository.findById(courseId);
    if (!course) {
      return {
        success: false,
        error: "Curso não encontrado",
      };
    }

    await repository.delete(courseId);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Erro interno do servidor ao deletar curso",
    };
  }
}
