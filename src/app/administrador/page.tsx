"use client";
import { BookOpen, Eye } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getAllCourses } from "@/actions/course/get-all/get-all-course";
import DeleteCourseAlert from "@/components/alert/delete-course";
import CreateCourseDialog from "@/components/dialog/create-course";
import UpdateCourseDialog from "@/components/dialog/update-course";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CourseEntity from "@/db/entities/course";

export default function AdminCourses() {
  const [courses, setCourses] = useState<CourseEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await getAllCourses();

      if (response.success && response.data) {
        setCourses(response.data);
      } else {
        toast.error(response.error || "Erro ao carregar cursos");
      }
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
      toast.error("Erro ao carregar cursos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-start justify-between rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
              <BookOpen className="h-8 w-8 text-blue-600" />
              Gerenciamento de Cursos
            </h1>
            <p className="mt-2 text-gray-600">
              Crie e gerencie os cursos da sua instituição
            </p>
          </div>
          <CreateCourseDialog onCourseCreated={loadCourses} />
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Cursos Existentes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <div className="py-8 text-center">
                  <p className="text-gray-500">Carregando cursos...</p>
                </div>
              ) : courses.length === 0 ? (
                <div className="py-8 text-center">
                  <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                  <p className="text-gray-500">
                    Nenhum curso cadastrado ainda.
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Comece criando seu primeiro curso!
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100 hover:bg-gray-100">
                        <TableHead className="font-semibold">Curso</TableHead>
                        <TableHead className="font-semibold">
                          Descrição
                        </TableHead>
                        <TableHead className="font-semibold">Preço</TableHead>
                        <TableHead className="font-semibold">Módulos</TableHead>
                        <TableHead className="text-right font-semibold">
                          Ações
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                                <Image
                                  src={
                                    course.imageUrl || "/placeholder-course.jpg"
                                  }
                                  alt={course.name}
                                  width={40}
                                  height={40}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span>{course.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="line-clamp-2 max-w-xs text-sm text-gray-600">
                              {course.description}
                            </p>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-blue-600">
                              {(
                                (course.priceInCents || 0) / 100
                              ).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
                              {course.courseContent?.length || 0} módulos
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <DeleteCourseAlert
                                course={course}
                                reloadCourses={loadCourses}
                              />
                              <UpdateCourseDialog
                                course={course}
                                onCourseUpdated={loadCourses}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
