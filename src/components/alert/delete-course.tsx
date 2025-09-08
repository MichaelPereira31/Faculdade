import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { deleteCourse } from "@/actions/course/delete/delete-course";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CourseEntity from "@/db/entities/course";

import { Button } from "../ui/button";

interface DeleteCourseProps {
  course: CourseEntity;
  reloadCourses: () => void;
}

export default function DeleteCourseAlert({
  course,
  reloadCourses,
}: DeleteCourseProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const handleDeleteCourse = async (courseId: string) => {
    try {
      setDeletingId(courseId);
      const response = await deleteCourse(courseId);
      if (response.success) {
        toast.success("Curso deletado com sucesso!");
        await reloadCourses();
      } else {
        toast.error("Erro ao deletar curso");
      }
    } catch {
      toast.error("Erro ao deletar curso");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir curso</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o curso &quot;
            {course.name}&quot;? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteCourse(course.id)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={deletingId === course.id}
          >
            {deletingId === course.id ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
