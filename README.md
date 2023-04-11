# free-buyer

## Entendendo como o projeto está estruturado

### Requisitos para rodar o projeto
#### Setup de ambiente:
- [Npm](https://docs.npmjs.com/cli/v9/commands/npm)
- [Node LTS](https://nodejs.org/en/)

### Como rodar na minha máquina?

- Clone o projeto `git clone https://github.com/felipebravo/free-buyer.git`
- Crie uma nova branch a partir da branch develop: `git checkout -b <nome-da-nova-branch> develop`
- Rode `npm install`
- Pronto 🎉

### Tecnologias do projeto

- Axios 
- Swagger
- dotenv
- bcryptjs
- passport-jwt
- Prisma
- NestJS
- MySQL
- TypeScript

### Estrutura do projeto

- `./src/modules/*`: Cada pasta aqui representa uma entidade do sistema, atualmente temos `user`, `address`, `products`, `order`, `delivery`
- `./prisma/schema.prisma`: Aqui o arquivo com as definições de modelos de dados, relações, campos, tipos e configurações do banco de dados.
-  `./src/database/prisma.service.ts`: Aqui estabelecemos a conexão com o banco de dados quando o módulo do Nest.js é inicializado e garantimos que a conexão seja fechada corretamente ao finalizar a aplicação.

### Como usar?

- Execute `npm run start: dev` para inicializar o servidor em modo de desenvolvimento para alterar o código fonte e ver os resultados em tempo real.

### Diagrama DER

![FreeBuyer](https://user-images.githubusercontent.com/5833664/231256938-78bdd91c-3c3a-4a36-8d61-e7097070501f.jpg)

