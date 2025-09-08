# 🎓 Sistema Faculdade

[![Docker](https://img.shields.io/badge/Docker-✓-blue?logo=docker)](https://www.docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-✓-336791?logo=postgresql)](https://www.postgresql.org/)
[![Next.js](https://img.shields.io/badge/Next.js-✓-000000?logo=next.js)](https://nextjs.org/)

Um sistema moderno para gestão acadêmica desenvolvido com Next.js e PostgreSQL, containerizado com Docker para fácil implantação.

## 🐳 Execução com Docker

### 📋 Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)

### 🚀 Execução Rápida

Siga estes passos simples para executar a aplicação:

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/MichaelPereira31/Faculdade.git
   cd Faculdade

2. **Executar com Docker Compose**
   ```bash
   # Subir toda a aplicação (Next.js + PostgreSQL) em segundo plano
    docker-compose up -d
    
    # Ou para ver os logs em tempo real
    docker-compose up
