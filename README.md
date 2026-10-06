# 📚 BookStore Manager CLI

Aplicação de linha de comando (CLI) para gerenciamento completo de uma livraria, permitindo o controle de autores, livros, clientes, empréstimos, devoluções e relatórios gerenciais com integração a um banco de dados relacional PostgreSQL.

---

## 🎯 Objetivo

O objetivo deste projeto é oferecer uma solução simples e eficiente via interface de terminal para a gestão do acervo de uma livraria. O sistema permite realizar operações de CRUD (Create, Read, Update, Delete) de entidades principais, controlar o fluxo de empréstimo e devolução de exemplares em tempo real e gerar relatórios.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem**: [TypeScript](https://www.typescriptlang.org/) (Node.js ESM)
- **Execução / Runtime**: [Node.js](https://nodejs.org/) & [tsx](https://github.com/privatenumber/tsx)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **Driver de BD**: [node-postgres (`pg`)](https://node-postgres.com/)
- **Variáveis de Ambiente**: [dotenv](https://github.com/motdotla/dotenv)
- **Geradores de Identificadores**: [uuid](https://github.com/uuidjs/uuid)

---

## 📋 Requisitos para Execução

- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node)
- Servidor **PostgreSQL** instalado e em execução

---

## 🗄️ Configuração do Banco de Dados

1. Certifique-se de que o servidor PostgreSQL está em execução.
2. Crie o banco de dados no PostgreSQL (por exemplo, `bookstore`):
   ```sql
   CREATE DATABASE bookstore;
   ```
3. Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=sua_senha
   DB_NAME=bookstore
   ```
4. Execute o script de criação automatizada das tabelas:
   ```bash
   npm run db:setup
   ```

---

## 🚀 Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/GabrielFilomeno/BookStore-Manager-CLI.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd BookStore-Manager-CLI
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

---

## 💻 Execução

### Modo de Desenvolvimento (Live execution via TSX)

```bash
npm run dev
```

### Modo de Produção (Compilado)

```bash
npm run build
npm start
```

---

## 🏗️ Arquitetura do Projeto

O projeto segue princípios de **Arquitetura em Camadas (Layered Architecture)** com separação clara de responsabilidades:

- **Entities**: Objetos de domínio com regras de negócio e propriedades encapsuladas.
- **Models**: Interfaces que mapeiam a estrutura das tabelas no banco de dados.
- **Mappers**: Conversores estáticos entre os modelos de persistência (`Models`) e os objetos de domínio (`Entities`).
- **Repositories**: Responsáveis pelo acesso a dados, execução de consultas SQL e comunicação com o PostgreSQL via `pg`.
- **Services**: Contêm a lógica de negócio, validações de entrada e regras de aplicação.
- **Controllers**: Intermediam a comunicação entre o terminal (`readline`) e os serviços.
- **Menus**: Interface interativa de linha de comando dividida em submenus por módulo.

---

## ✨ Funcionalidades Implementadas

### ✍️ 1. Gerenciamento de Autores

- Cadastrar novo autor
- Listar todos os autores
- Buscar autor por ID
- Atualizar autor
- Remover autor

### 📖 2. Gerenciamento de Livros

- Cadastrar livro vinculando a um autor
- Listar livros cadastrados
- Buscar livro por ID
- Atualizar dados de um livro
- Remover livro

### 👥 3. Gerenciamento de Clientes

- Cadastrar cliente (com CPF único e endereço)
- Listar clientes
- Buscar cliente por ID ou CPF
- Atualizar dados do cliente
- Remover cliente

### 🤝 4. Gerenciamento de Empréstimos e Devoluções

- **Realizar empréstimo**: Valida existência do livro, existência do cliente e disponibilidade de quantidade do exemplar no acervo (decrementa a quantidade disponível).
- **Registrar devolução**: Incrementa a quantidade disponível do exemplar no acervo e remove o registro de empréstimo pendente.
- **Consultar empréstimos**: Exibe a lista de empréstimos com dados do livro, do cliente e a data do empréstimo.

### 📊 5. Relatórios Gerenciais

- **Livros disponíveis**: Lista livros que possuem exemplares disponíveis para empréstimo.
- **Livros emprestados**: Lista todos os livros que estão atualmente emprestados.
- **Livros cadastrados por autor**: Agrupa/ordena livros de acordo com seu respectivo autor.
- **Quantidade de empréstimos por livro**: Exibe a contagem histórica/acumulada de empréstimos por livro.
- **Clientes com empréstimos ativos**: Exibe os clientes que possuem empréstimos pendentes no momento.

---

## 📂 Estrutura de Pastas

```text
BookStore-Manager-CLI/
├── src/
│   ├── controllers/      # Controladores de CLI (Author, Book, Client, Loan, Report)
│   ├── entities/         # Entidades de domínio (Author, Book, Client, Loan)
│   ├── infra/            # Conexão com banco de dados (database.ts, schema.sql, setup-database.ts)
│   ├── menus/            # Menus interativos do terminal
│   ├── models/           # Interfaces dos modelos de dados (Persistence)
│   ├── repositories/     # Repositórios SQL (Author, Book, Client, Loan, Report)
│   ├── services/         # Serviços com regras de negócio
│   ├── shared/           # Utilitários, Mappers e Erros customizados
│   └── main.ts           # Ponto de entrada da aplicação CLI
├── .env.example          # Exemplo de variáveis de ambiente
├── package.json          # Configuração do projeto e dependências
├── tsconfig.json         # Configurações do TypeScript
└── README.md             # Documentação do projeto
```

---

## 💡 Exemplos de Utilização

### Menu Principal

```text
========================================
       GERENCIADOR DE LIVRARIA
========================================
1. Autores
2. Livros
3. Clientes
4. Empréstimos
5. Relatórios
6. Encerrar aplicação
========================================
Escolha uma opção:
```

### Realizar Empréstimo

```text
--- REALIZAR EMPRÉSTIMO DE LIVRO ---

--- LIVROS DISPONÍVEIS ---
┌─────────┬──────────────────────────────────────┬──────────────────────┬───────────┬─────────────┐
│ (index) │ ID                                   │ Título               │ Gênero    │ Disponíveis │
├─────────┼──────────────────────────────────────┼──────────────────────┼───────────┼─────────────┤
│ 0       │ 4f3a8b22-81cd-4c28-98e3-99b51c110291 │ O Senhor dos Anéis   │ Fantasia  │ 3           │
└─────────┴──────────────────────────────────────┴──────────────────────┴───────────┴─────────────┘

Informe o ID do livro: 4f3a8b22-81cd-4c28-98e3-99b51c110291

--- CLIENTES CADASTRADOS ---
┌─────────┬──────────────────────────────────────┬────────────────┬────────────────┐
│ (index) │ ID                                   │ Nome           │ CPF            │
├─────────┼──────────────────────────────────────┼────────────────┼────────────────┤
│ 0       │ a1b2c3d4-e5f6-7890-abcd-ef1234567890 │ Gabriel Silva  │ 123.456.789-00 │
└─────────┴──────────────────────────────────────┴────────────────┴────────────────┘

Informe o ID do cliente: a1b2c3d4-e5f6-7890-abcd-ef1234567890

Informe a data do empréstimo (DD/MM/AAAA) ou pressione Enter para usar a data atual:

Empréstimo realizado com sucesso!
```

---

## 👥 Integrantes da Equipe

- Gabriel Filomeno

---

## 📌 Link do Kanban

- [Quadro Kanban do Projeto (GitHub Projects)](https://github.com/users/GabrielFilomeno/projects/2)
