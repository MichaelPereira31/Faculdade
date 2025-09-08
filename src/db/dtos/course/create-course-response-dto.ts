export type CreateCourseResponseDTO = {
  courseContent: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    courseId: string;
  }[];
} & {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  priceInCents: number;
  createdAt: Date;
  updatedAt: Date;
};
