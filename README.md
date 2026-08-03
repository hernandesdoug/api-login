# 🔑 API Login & Cadastro

Esta é uma API RESTful para cadastro e login de usuários, desenvolvida em **Node.js** com **Express** e o ORM **Sequelize** integrado ao banco de dados **MySQL**.

---

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js
- **Framework Web:** Express
- **ORM:** Sequelize (MySQL)
- **Autenticação e Criptografia:** JWT e Bcrypt (hashing de senhas)
- **Ambiente e Auxiliares:** Dotenv, Cors, Nodemon
- **Documentação da API:** Swagger
---

## 🚀 Como Executar o Projeto Localmente

### 1. Clonar e Instalar Dependências
```bash
# Instale as dependências com npm (ou yarn)
npm install
```

### 2. Configurar o Banco de Dados (MySQL)
Crie um banco de dados MySQL chamado `api_login` (ou o nome de sua preferência) e execute o script SQL a seguir para criar a tabela de usuários:

```sql
CREATE DATABASE IF NOT EXISTS api_login;
USE api_login;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    dateBirth DATETIME NOT NULL,
    phoneNumber INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    nationality VARCHAR(255) NOT NULL,
    documentType VARCHAR(255) NOT NULL
);
```

### 3. Configurar as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e defina as variáveis de conexão com o banco de dados:

```env
DATABASE_NAME=api_login
DATABASE_USER=seu_usuario_do_mysql
DATABASE_PASSWORD=sua_senha_do_mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT= 3306
JWT_SECRET_KEY=sua_chave_secreta_jwt_aqui
```

### 4. Iniciar em Modo de Desenvolvimento
```bash
npm run dev
```
O servidor iniciará na porta `3333`.

---

## 🛣️ Rotas da API

| Rota | Método | Descrição | Corpo da Requisição (JSON) | Protegida por Token? |
| --- | --- | --- | --- |
| `/users` | `GET` | Lista todos os usuários (com senha oculta) | N/A | Sim |
| `/users/:id` | `GET` | Busca um usuário por ID (com senha oculta) | N/A | Sim |
| `/users` | `POST` | Cadastra um novo usuário (Gera hash Bcrypt da senha) | `{ fullName, email, dateBirth, phoneNumber, password, cfPassword, nationality, documentType }` | Não |
| `/users/login` | `POST` | Valida credenciais (Compara hash com Bcrypt) | `{ email, password }` | Não |
| `/users/:id` | `PUT` | Atualiza informações do usuário | `{ fullName, email, dateBirth, phoneNumber, password, nationality, documentType }` | Sim |
| `/users/:id` | `DELETE` | Exclui um usuário do sistema | N/A | Sim |

---

## Documentação Swagger

Após iniciar a API:

http://localhost:3333/api-docs

## Autenticação

A API utiliza JWT.

1. Faça login em `/users/login`
2. Copie o token retornado
3. Clique em Authorize no Swagger
4. Informe:

Bearer SEU_TOKEN

## 📐 Padrões e Boas Práticas Adotadas

1. **Separação de Responsabilidades (MVC):** Divisão clara entre rotas (`src/routes/`) e controladores (`src/controllers/`) para melhorar a manutenibilidade do código.
2. **Segurança (Hashing de Senha):** Utilização do pacote `bcrypt` para criptografar as senhas no cadastro e compará-las de forma segura no login.
3. **Integridade de Dados:** Checagem de e-mail duplicado no cadastro de usuários para evitar sobreposições.
4. **Proteção de Informações Sensíveis:** Exclusão do campo `password` nas respostas HTTP que retornam os dados de perfil dos usuários (`attributes: { exclude: ["password"] }`).
