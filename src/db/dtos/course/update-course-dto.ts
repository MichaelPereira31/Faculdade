import { CreateCourseDTO } from "./create-course-dto";

export type UpdateCourseDTO = Partial<CreateCourseDTO> & {
  id: string;
};
