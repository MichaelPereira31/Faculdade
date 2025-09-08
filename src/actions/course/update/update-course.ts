"use server";

import CourseRepository from "@/db/Repositories/course-repository";
import { uploadImage } from "@/providers/storage";

interface CourseModule {
  id?: string;
  name: string;
}

interface UpdateCourseRequest {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  priceInCents: number;
  modules: CourseModule[];
}

interface UpdateCourseResponse {
  success: boolean;
  error?: string;
}

export async function updateCourse(
  data: UpdateCourseRequest,
): Promise<UpdateCourseResponse> {
  try {
    let imageUrl: string | null = data.imageUrl || null;

    if (data.imageUrl && data.imageUrl.startsWith("data:image")) {
      const uploadResult = await uploadImage(data.imageUrl);

      if (!uploadResult.success) {
        return {
          success: false,
          error: uploadResult.error,
        };
      }

      imageUrl = uploadResult.imageUrl || null;
    }

    const courseData = {
      name: data.name,
      description: data.description,
      imageUrl: imageUrl || "",
      priceInCents: data.priceInCents,
    };

    const repository = CourseRepository.getInstance();

    const updatedCourse = await repository.update(
      data.id,
      courseData,
      data.modules,
    );

    if (!updatedCourse) {
      return {
        success: false,
        error: "Curso não encontrado",
      };
    }

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}
