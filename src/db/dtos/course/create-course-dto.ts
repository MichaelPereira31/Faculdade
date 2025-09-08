import { CreateCourseContentDTO } from "../course-content/create-course-content-dto";

export type CreateCourseDTO = {
  name: string;
  description: string;
  imageUrl?: string | null;
  priceInCents: number;
  courseContents: Partial<CreateCourseContentDTO>[];
};
