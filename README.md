# sosauto - API
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Prisma](https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Aws](https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Descrição

API para o sistema de gerenciamento de oficinas mecânicas.
Foi criado para o trabalho de conclusão de curso do curso de Ciência da Computação da Universidade Paulista.
Sua principal função é gerenciar o cadastro de clientes, veículos, serviços e ordens de serviço. De modo que o usuário possa ter um controle maior sobre o que está acontecendo em sua oficina.

## Como rodar

Para rodar a aplicação, é necessário ter o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados.
```bash
docker-compose up -d
```

Rode as migrations para criar as tabelas no banco de dados.
```bash
  npm run setup
```

Execute o comando para rodar a aplicação.
```bash
  npm run dev
```

