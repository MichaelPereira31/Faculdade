const { PrismaClient, UserType } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- Clean existing data ---
  await prisma.courseContent.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️  Dados antigos removidos");

  // --- Criptografar senhas ---
  const hashedPasswordAdmin = await bcrypt.hash('123456', 12);
  const hashedPasswordUser1 = await bcrypt.hash('123456', 12);
  const hashedPasswordUser2 = await bcrypt.hash('123456', 12);

  // --- Users ---
  await prisma.user.createMany({
    data: [
      {
        email: "admin@instituicao.edu",
        name: "Administrador",
        password: hashedPasswordAdmin,
        type: UserType.ADMIN,
      },
      {
        email: "user1@teste.com",
        name: "João Silva",
        password: hashedPasswordUser1,
        type: UserType.USER,
      },
      {
        email: "user2@teste.com",
        name: "Maria Santos",
        password: hashedPasswordUser2,
        type: UserType.USER,
      },
    ],
    skipDuplicates: true,
  });

  console.log("👥 Usuários criados com senhas criptografadas");

  // --- Courses ---
  await prisma.course.upsert({
    where: { name: "Introdução à Programação" },
    update: {},
    create: {
      name: "Introdução à Programação",
      description: "Aprenda os conceitos básicos de lógica de programação.",
      imageUrl: '/imagens/faculdade.jpg',
      priceInCents: 19900,
      courseContent: {
        create: [
          { content: "O que é programação e por que aprender?" },
          { content: "Variáveis, operadores e controle de fluxo." },
          { content: "Introdução a funções e boas práticas." },
        ],
      },
    },
  });

  await prisma.course.upsert({
    where: { name: "Banco de Dados com PostgreSQL" },
    update: {},
    create: {
      name: "Banco de Dados com PostgreSQL",
      description: "Domine SQL e aprenda a modelar bancos relacionais.",
      imageUrl: '/imagens/faculdade.jpg',
      priceInCents: 29900,
      courseContent: {
        create: [
          { content: "Conceitos básicos de bancos de dados." },
          { content: "Criando tabelas e relacionamentos." },
          { content: "Consultas avançadas e otimização." },
        ],
      },
    },
  });

  await prisma.course.upsert({
    where: { name: "Desenvolvimento Web com React" },
    update: {},
    create: {
      name: "Desenvolvimento Web com React",
      description: "Construa interfaces modernas com React e Next.js.",
      imageUrl: '/imagens/faculdade.jpg',
      priceInCents: 39900,
      courseContent: {
        create: [
          { content: "Fundamentos do React e JSX." },
          { content: "Componentes, props e estado." },
          { content: "Rotas e integração com APIs." },
        ],
      },
    },
  });

  console.log("📚 Cursos criados");
  console.log("✅ Seeding concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });