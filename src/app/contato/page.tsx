"use client";
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email",
      content: "contato@instituicao.edu.br",
      link: "mailto:contato@instituicao.edu.br",
      description: "Envie-nos um email para dúvidas gerais",
    },
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Telefone",
      content: "(11) 1111-1111",
      link: "tel:+5511111111",
      description: "Atendimento telefônico de segunda a sexta",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Horário de Atendimento",
      content: "Segunda a Sexta: 8h às 18h",
      link: "#",
      description: "Sábado: 9h às 12h",
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-blue-600" />,
      title: "Suporte Técnico",
      content: "suporte@instituicao.edu.br",
      link: "mailto:suporte@instituicao.edu.br",
      description: "Suporte para problemas técnicos",
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Admissões",
      content: "admissoes@instituicao.edu.br",
      link: "mailto:admissoes@instituicao.edu.br",
      description: "Informações sobre processos seletivos",
    },
  ];

  const faqItems = [
    {
      question: "Como posso me inscrever em um curso?",
      answer:
        "Visite nossa página de cursos, escolha o curso desejado e siga o processo de inscrição online.",
    },
    {
      question: "Os cursos possuem certificado?",
      answer:
        "Sim, todos os nossos cursos emitem certificado reconhecido pelo MEC upon completion.",
    },
    {
      question: "Posso assistir às aulas pelo celular?",
      answer:
        "Sim, nossa plataforma é totalmente responsiva e funciona em qualquer dispositivo móvel.",
    },
    {
      question: "Como funciona o suporte aos alunos?",
      answer:
        "Oferecemos suporte via email, telefone e atendimento presencial para todas as dúvidas.",
    },
  ];

  const departments = [
    {
      name: "Secretaria Acadêmica",
      email: "secretaria@instituicao.edu.br",
      phone: "(11) 1111-1111",
    },
    {
      name: "Financeiro",
      email: "financeiro@instituicao.edu.br",
      phone: "(11) 1111-1111",
    },
    {
      name: "Biblioteca",
      email: "biblioteca@instituicao.edu.br",
      phone: "(11) 1111-1111",
    },
    {
      name: "Tecnologia da Informação",
      email: "ti@instituicao.edu.br",
      phone: "(11) 1111-1111",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Entre em <span className="text-blue-600">Contato</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
            Estamos aqui para ajudar você. Escolha a melhor forma de entrar em
            contato conosco.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <Card className="rounded-2xl border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
                  Informações de Contato
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {contactInfo.map((item, index) => (
                    <Link
                      key={index}
                      href={item.link}
                      className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-blue-300 hover:shadow-md"
                    >
                      <div className="mb-4 rounded-full bg-blue-100 p-3 transition-colors group-hover:bg-blue-200">
                        {item.icon}
                      </div>
                      <h4 className="mb-2 font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                        {item.title}
                      </h4>
                      <p className="mb-2 font-medium text-gray-900">
                        {item.content}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">
                  Setores e Departamentos
                </h3>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                    >
                      <h4 className="mb-2 font-semibold text-gray-900">
                        {dept.name}
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>Email: {dept.email}</p>
                        <p>Telefone: {dept.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="rounded-2xl border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">
                  Perguntas Frequentes
                </h3>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                    >
                      <h4 className="mb-3 flex items-start font-semibold text-gray-900">
                        <span className="mr-2 text-blue-600">•</span>
                        {item.question}
                      </h4>
                      <p className="pl-5 text-sm text-gray-600">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">
                  Redes Sociais
                </h3>
                <p className="mb-6 text-center text-gray-600">
                  Siga-nos nas redes sociais para ficar por dentro de todas as
                  novidades
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-14 justify-center py-4"
                  >
                    <Twitter className="mr-2 h-5 w-5 text-blue-400" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 justify-center py-4"
                  >
                    <Facebook className="mr-2 h-5 w-5 text-blue-600" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 justify-center py-4"
                  >
                    <Instagram className="mr-2 h-5 w-5 text-pink-600" />
                    Instagram
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 justify-center py-4"
                  >
                    <Linkedin className="mr-2 h-5 w-5 text-blue-700" />
                    LinkedIn
                  </Button>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Nos encontre em @instituicao_edu
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">
                  Nossa Localização
                </h3>
                <div className="flex aspect-video items-center justify-center rounded-xl bg-gray-200">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                    <p className="mb-2 text-gray-600">Centro</p>
                    <Link
                      href="#"
                      className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Ver no Google Maps
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-12 rounded-2xl border-0 bg-gradient-to-r from-blue-600 to-blue-800 shadow-xl">
          <CardContent className="p-8 text-center text-white">
            <h3 className="mb-4 text-2xl font-bold">Contato Emergencial</h3>
            <p className="mb-4 text-lg">
              Para assuntos urgentes fora do horário comercial
            </p>
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <div className="flex items-center">
                <Phone className="mr-2 h-6 w-6" />
                <span className="text-xl font-semibold">(11) 99999-9999</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-6 w-6" />
                <span className="text-xl font-semibold">
                  contato@instituicao.edu.br
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
