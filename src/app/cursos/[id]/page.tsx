"use client";
import { ArrowLeft, Calendar, Clock, FileText, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getCourseById } from "@/actions/course/get-by-id/get-course-by-id";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CourseEntity from "@/db/entities/course";
import { formatPrice } from "@/util/format-price";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;

  const [course, setCourse] = useState<CourseEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await getCourseById(courseId);

        if (response.success && response.data) {
          setCourse(response.data);
        } else {
          setError(response.error || "Curso não encontrado");
        }
      } catch (err) {
        setError("Erro ao carregar curso");
        console.error("Erro ao buscar curso:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">Carregando curso...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto max-w-md rounded-lg bg-red-100 p-4 text-red-600">
            <h2 className="mb-2 text-xl font-semibold">Erro</h2>
            <p className="mb-4">{error || "Curso não encontrado"}</p>
            <Link href="/cursos">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Cursos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/cursos">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Cursos
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {course.name}
            </h1>
            <p className="mb-6 text-xl text-blue-100">{course.description}</p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>{course.courseContent.length} módulos</span>
              </div>

              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>Atualizado em {formatDate(course.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="mb-8 overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200">
                {course.imageUrl ? (
                  <Image
                    src={course.imageUrl}
                    alt={course.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <FileText className="h-16 w-16 text-blue-400" />
                  </div>
                )}
              </div>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Sobre este curso
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p>{course.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  Conteúdo do Curso
                </h2>
                <div className="space-y-3">
                  {course.courseContent.map((content, index) => (
                    <div
                      key={content.id}
                      className={`cursor-pointer rounded-lg border p-4 transition-all ${
                        selectedModule === index
                          ? "border-blue-300 bg-blue-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedModule(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                            <span className="text-sm font-semibold text-blue-600">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {content.content}
                            </h3>
                            <p className="text-sm text-gray-600">
                              5 aulas • 45 minutos
                            </p>
                          </div>
                        </div>
                        <Play className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-gray-900">
                    {formatPrice(course.priceInCents)}
                  </div>
                  <p className="text-gray-600">
                    ou 12x de {formatPrice(course.priceInCents / 12)}
                  </p>
                </div>

                <div className="mb-6 space-y-4">
                  <Button className="w-full bg-blue-600 py-3 text-lg hover:bg-blue-700">
                    Matricular-se agora
                  </Button>
                  <Button variant="outline" className="w-full py-3 text-lg">
                    Adicionar à lista de desejos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
