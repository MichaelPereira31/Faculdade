"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllCourses } from "@/actions/course/get-all/get-all-course";
import CourseEntity from "@/db/entities/course";
import Image from "next/image";

export default function Courses() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<CourseEntity[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await getAllCourses();
      if (response.success && response.data) {
        setCourses(response.data);
      } else {
        setError(response.error || "Erro ao carregar cursos");
      }
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
      setError("Erro ao carregar cursos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando cursos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-2xl text-red-500">⚠️</div>
          <p className="mb-4 text-gray-700">{error}</p>
          <Button
            onClick={fetchCourses}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">Nossos Cursos</h1>
          <p className="max-w-2xl text-lg">
            Descubra uma variedade de cursos ministrados por especialistas do
            mercado e impulsione sua carreira.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {courses.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum curso disponível.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
              >
                <div className="relative mb-4 h-40 w-full">
                  <Image
                    src={course.imageUrl || "/placeholder.png"}
                    alt={course.name}
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {course.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                  {course.description}
                </p>
                <Link
                  href={`/cursos/${course.id}`}
                  className="mt-4 inline-block text-blue-600 hover:underline"
                >
                  Ver detalhes →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-800 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">
            Não encontrou o curso ideal?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl">
            Cadastre-se para receber novidades sobre novos cursos e
            oportunidades exclusivas.
          </p>
          <div className="mx-auto flex max-w-md flex-col justify-center gap-2 sm:flex-row">
            <Input
              type="email"
              placeholder="Seu e-mail"
              className="border-0 bg-white text-gray-800"
            />
            <Button className="bg-white whitespace-nowrap text-blue-800 hover:bg-blue-100">
              Inscrever-se
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
