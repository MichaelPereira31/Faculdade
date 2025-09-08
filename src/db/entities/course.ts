type CourseEntity = {
  courseContent: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    courseId: string;
    content: string;
  }[];
} & {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  priceInCents: number;
  createdAt: Date;
  updatedAt: Date;
};

export default CourseEntity;
