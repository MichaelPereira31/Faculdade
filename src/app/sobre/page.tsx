import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl">
              Conheça Nossa Instituição
            </h1>
            <p className="mx-auto text-lg text-blue-700 md:text-xl md:leading-relaxed">
              Uma tradição de excelência no ensino superior há mais de 50 anos,
              formando profissionais que fazem a diferença no mercado.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-blue-900">Quem Somos</h2>
              <div className="mx-auto mt-2 h-1 w-20 bg-blue-600"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6 rounded-2xl bg-white p-8 shadow-lg">
                <p className="text-lg leading-relaxed text-gray-700">
                  Somos uma instituição de ensino superior comprometida com a
                  excelência acadêmica e a formação integral de nossos alunos.
                  Nossa história começou em 1970, e desde então temos nos
                  dedicado a proporcionar educação de qualidade.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Nossa estrutura conta com campus moderno, laboratórios
                  equipados e um corpo docente altamente qualificado, composto
                  por mestres e doutores com ampla experiência em suas áreas de
                  atuação.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center rounded-2xl bg-blue-600 p-6 text-center text-white shadow-lg">
                  <span className="text-4xl font-bold">5.000+</span>
                  <span className="mt-2 text-sm">Alunos</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-blue-700 p-6 text-center text-white shadow-lg">
                  <span className="text-4xl font-bold">50+</span>
                  <span className="mt-2 text-sm">Cursos</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-blue-800 p-6 text-center text-white shadow-lg">
                  <span className="text-4xl font-bold">300+</span>
                  <span className="mt-2 text-sm">Professores</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-blue-900 p-6 text-center text-white shadow-lg">
                  <span className="text-4xl font-bold">50</span>
                  <span className="mt-2 text-sm">Anos de história</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-blue-900">
                Missão, Visão e Valores
              </h2>
              <div className="mx-auto mt-2 h-1 w-20 bg-blue-600"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center shadow-md">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
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
                <h3 className="mb-4 text-xl font-semibold text-blue-800">
                  Missão
                </h3>
                <p className="text-gray-700">
                  Promover educação superior de qualidade, formando cidadãos
                  críticos, éticos e capacitados para transformar a sociedade
                  através do conhecimento.
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center shadow-md">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-4 text-xl font-semibold text-blue-800">
                  Visão
                </h3>
                <p className="text-gray-700">
                  Ser referência nacional em educação superior, reconhecida pela
                  excelência acadêmica e pela inovação no ensino, pesquisa e
                  extensão.
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center shadow-md">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-4 text-xl font-semibold text-blue-800">
                  Valores
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center justify-center">
                    <span className="mr-2 text-blue-600">•</span> Excelência
                    acadêmica
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2 text-blue-600">•</span> Ética e
                    integridade
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2 text-blue-600">•</span> Inovação e
                    criatividade
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2 text-blue-600">•</span>{" "}
                    Responsabilidade social
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2 text-blue-600">•</span> Respeito à
                    diversidade
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-blue-900">
                Comissão Própria de Avaliação (CPA)
              </h2>
              <div className="mx-auto mt-2 h-1 w-20 bg-blue-600"></div>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-10 text-white shadow-xl">
              <p className="mb-6 text-lg leading-relaxed">
                A Comissão Própria de Avaliação (CPA) é responsável pela
                coordenação do processo de autoavaliação institucional, com o
                objetivo de promover a melhoria da qualidade acadêmica e
                administrativa da instituição.
              </p>
              <p className="mb-8 text-lg leading-relaxed">
                A CPA é formada por representantes de todos os segmentos da
                comunidade acadêmica: professores, estudantes, técnicos
                administrativos e representantes da sociedade civil.
              </p>

              <div className="rounded-xl bg-blue-700/30 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-semibold">
                  Principais atribuições da CPA:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mt-1 mr-3 text-xl">•</span>
                    <span>
                      Coordenar o processo de autoavaliação institucional
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mt-1 mr-3 text-xl">•</span>
                    <span>
                      Elaborar relatórios periódicos sobre a qualidade dos
                      cursos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mt-1 mr-3 text-xl">•</span>
                    <span>
                      Divulgar os resultados para a comunidade acadêmica
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mt-1 mr-3 text-xl">•</span>
                    <span>
                      Propor ações de melhoria com base nas avaliações
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-blue-900">
                Trabalhe Conosco
              </h2>
              <div className="mx-auto mt-2 h-1 w-20 bg-blue-600"></div>
            </div>

            <div className="rounded-2xl bg-white p-10 shadow-xl">
              <p className="mb-8 text-center text-lg text-gray-700">
                Valorizamos profissionais talentosos e comprometidos com a
                educação. Se você deseja fazer parte do nosso time, envie seu
                currículo e faça parte de uma instituição que transforma vidas
                através do conhecimento.
              </p>

              <div className="mb-10">
                <h3 className="mb-6 text-center text-2xl font-semibold text-blue-800">
                  Vagas disponíveis
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 transition-all hover:shadow-md">
                    <h4 className="mb-2 text-lg font-medium text-blue-800">
                      Professor de Direito Civil
                    </h4>
                    <p className="text-blue-600">
                      Mestrado ou Doutorado na área · 20h semanais
                    </p>
                  </div>
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 transition-all hover:shadow-md">
                    <h4 className="mb-2 text-lg font-medium text-blue-800">
                      Coordenador de Curso de Engenharia
                    </h4>
                    <p className="text-blue-600">
                      Doutorado na área · Experiência em gestão acadêmica
                    </p>
                  </div>
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 transition-all hover:shadow-md">
                    <h4 className="mb-2 text-lg font-medium text-blue-800">
                      Analista de Tecnologia da Informação
                    </h4>
                    <p className="text-blue-600">
                      Graduação em TI · Conhecimento em redes e suporte
                    </p>
                  </div>
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 transition-all hover:shadow-md">
                    <h4 className="mb-2 text-lg font-medium text-blue-800">
                      Assistente Administrativo
                    </h4>
                    <p className="text-blue-600">
                      Ensino superior · Experiência em secretariado
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button className="bg-blue-600 px-8 py-3 text-lg hover:bg-blue-700">
                  <Link href="/contato">Enviar Currículo</Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-12 text-center text-white shadow-xl">
          <h2 className="mb-4 text-3xl font-bold">
            Venha fazer parte da nossa instituição
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
            Seja como aluno, professor ou colaborador, temos oportunidades para
            você crescer conosco.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="bg-white px-8 py-3 text-blue-600 hover:bg-blue-50">
              <Link href="/cursos">Conhecer Cursos</Link>
            </Button>
            <Button className="border-2 border-white bg-transparent px-8 py-3 hover:bg-blue-700">
              <Link href="/sobre">Processo Seletivo</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
