"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getAllCourses } from "@/actions/course/get-all/get-all-course";
import { Button } from "@/components/ui/button";
import CourseEntity from "@/db/entities/course";

export default function Home() {
  const [popularCourses, setPopularCourses] = useState<CourseEntity[]>([]);
  const [loading, setLoading] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Carlos Silva",
      role: "Ex-aluno de Engenharia",
      text: "A instituição me proporcionou não apenas conhecimento técnico, mas também as habilidades necessárias para me destacar no mercado de trabalho.",
      avatar: "/imagens/avatar.jpg",
    },
    {
      id: 2,
      name: "Mariana Oliveira",
      role: "Aluna de Design",
      text: "Os professores são incríveis e a estrutura da instituição é de primeira qualidade. Recomendo para todos que buscam uma formação de excelência.",
      avatar: "/imagens/avatar.jpg",
    },
    {
      id: 3,
      name: "Ricardo Santos",
      role: "Ex-aluno de Administração",
      text: "O conhecimento adquirido aqui foi fundamental para minha promoção a gerente. A grade curricular é atualizada e alinhada com as necessidades do mercado.",
      avatar: "/imagens/avatar.jpg",
    },
  ];

  const fetchPopularCourses = async () => {
    try {
      setLoading(true);
      const response = await getAllCourses();
      if (response.success && response.data) {
        setPopularCourses(response.data.slice(0, 4));
      } else {
        setPopularCourses([
          {
            id: "1",
            name: "Engenharia de Software",
            description:
              "Aprenda desenvolvimento de software com as melhores práticas do mercado",
            imageUrl: "/api/placeholder/300/200",
            priceInCents: 29700,
            createdAt: new Date(),
            updatedAt: new Date(),
            courseContent: [],
          },
          {
            id: "2",
            name: "Design Gráfico",
            description:
              "Domine as ferramentas e técnicas de design mais modernas",
            imageUrl: "/api/placeholder/300/200",
            priceInCents: 24900,
            createdAt: new Date(),
            updatedAt: new Date(),
            courseContent: [],
          },
          {
            id: "3",
            name: "Administração",
            description: "Formação completa em gestão empresarial e liderança",
            imageUrl: "/api/placeholder/300/200",
            priceInCents: 19900,
            createdAt: new Date(),
            updatedAt: new Date(),
            courseContent: [],
          },
          {
            id: "4",
            name: "Marketing Digital",
            description: "Estratégias digitais para alavancar negócios",
            imageUrl: "/api/placeholder/300/200",
            priceInCents: 17900,
            createdAt: new Date(),
            updatedAt: new Date(),
            courseContent: [],
          },
        ]);
      }
    } catch (error) {
      console.error("Erro ao buscar cursos populares:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularCourses();
  }, []);

  const formatPrice = (priceInCents: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(priceInCents / 100);
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 py-20 text-white">
        <div className="container mx-auto flex flex-col items-center px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Transforme seu futuro através da educação
          </h1>
          <p className="mb-8 max-w-2xl text-xl">
            Cursos de alta qualidade com professores especializados para
            impulsionar sua carreira
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="bg-white px-8 py-3 text-lg text-blue-700 hover:bg-blue-100">
              <Link href="/cursos">Ver Cursos</Link>
            </Button>
            <Button className="border-2 border-white bg-transparent px-8 py-3 text-lg hover:bg-blue-800">
              <Link href="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-blue-800">
            Por que escolher nossa instituição?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-blue-800">
                Professores Especializados
              </h3>
              <p className="text-gray-700">
                Nossos instrutores são mestres e doutores com experiência de
                mercado
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-blue-800">
                Certificação Reconhecida
              </h3>
              <p className="text-gray-700">
                Diplomas válidos em todo território nacional e reconhecidos pelo
                MEC
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-blue-800">
                Network de Alunos
              </h3>
              <p className="text-gray-700">
                Conecte-se com profissionais e ex-alunos em todo o Brasil
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-blue-800">
            Cursos em Destaque
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            Conheça nossos cursos mais procurados e impulse sua carreira
          </p>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {popularCourses.map((course) => (
                  <div
                    key={course.id}
                    className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200">
                      {course.imageUrl ? (
                        <Image
                          src={course.imageUrl}
                          alt={course.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-blue-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
                        {course.courseContent.length} módulos
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-blue-800">
                        {course.name}
                      </h3>
                      <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                        {course.description ||
                          "Curso completo com conteúdo atualizado e professores especializados."}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-700">
                          {formatPrice(course.priceInCents)}
                        </span>
                        <Link href={`/cursos/${course.id}`}>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Saiba mais
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link href="/cursos">
                  <Button className="bg-blue-600 px-8 py-3 text-white hover:bg-blue-700">
                    Ver Todos os Cursos
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-blue-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="mb-2 text-4xl font-bold">5.000+</div>
              <div className="text-blue-200">Alunos Matriculados</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">300+</div>
              <div className="text-blue-200">Professores</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">50+</div>
              <div className="text-blue-200">Cursos Disponíveis</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">92%</div>
              <div className="text-blue-200">Índice de Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-blue-800">
            O que nossos alunos dizem
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            Confira as experiências de quem já estudou conosco
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-xl bg-white p-6 shadow-md"
              >
                <div className="mb-4 flex items-center">
                  <div className="mr-4 h-14 w-14 overflow-hidden rounded-full bg-blue-200">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-blue-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.text}</p>
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Pronto para transformar sua carreira?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl">
            Junte-se a milhares de alunos e dê o próximo passo em sua jornada
            educacional
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/cursos">
              <Button className="bg-white px-8 py-3 text-lg text-blue-700 hover:bg-blue-100">
                Inscreva-se Agora
              </Button>
            </Link>
            <Link href="/contato">
              <Button className="border-2 border-white bg-transparent px-8 py-3 text-lg hover:bg-blue-700">
                Fale com um Consultor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
