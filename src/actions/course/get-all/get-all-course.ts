"use server";

import CourseEntity from "@/db/entities/course";
import CourseRepository from "@/db/Repositories/course-repository";

interface GetAllCoursesResponse {
  success: boolean;
  data?: CourseEntity[];
  error?: string;
}

export async function getAllCourses(): Promise<GetAllCoursesResponse> {
  try {
    const repository = CourseRepository.getInstance();

    const courses = await repository.findAll();

    return {
      success: true,
      data: courses,
    };
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return {
      success: false,
      error: "Erro interno do servidor ao buscar cursos",
    };
  }
}
