# 🛒 Projeto E-commerce com Carrinho - CoderHouse

Sistema de e-commerce desenvolvido como atividade da CoderHouse.  
A aplicação permite cadastrar e listar produtos, adicionar ao carrinho por sessão, finalizar a compra com verificação de estoque e geração de ticket. Possui autenticação local e via GitHub, logger com Winston, controle por roles e tratamento de erros customizado.

---

## 🚀 Tecnologias Usadas

- Node.js
- Express
- MongoDB + Mongoose
- Handlebars
- Passport.js (local + GitHub)
- Express-session
- Winston
- dotenv

---

## 📁 Estrutura de Pastas

```
📁 src/
┣ 📂 config/              # Configurações gerais e de logger
┣ 📂 dao/                 # DAO + persistência (MongoDB / FS)
┃ ┣ 📂 db/                 # MongoDB managers
┃ ┣ 📂 fs/                 # FileSystem managers
┃ ┗ 📂 models/             # Models do Mongoose
┣ 📂 controllers/         # Controladores das rotas
┣ 📂 services/            # Lógica de negócios
┣ 📂 middlewares/         # Autenticação, logger e tratamento de erro
┣ 📂 routes/              # Rotas (API, views, logger)
┣ 📂 views/               # Templates Handlebars
┣ 📂 dtos/                # DTOs para resposta segura
┣ 📄 app.js               # App principal
┗ 📄 dbConfig.js          # Conexão MongoDB
```

---

## ⚙️ Configuração do Ambiente

Crie um arquivo `.env` com as credenciais:

```env
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/ecommerce
GITHUB_CLIENT_ID=xxxxxx
GITHUB_CLIENT_SECRET=xxxxxx
```

---

## ▶️ Como Rodar o Projeto

```bash
npm install
npm start
```

---

## 🌐 Acessos no Navegador

- 🟦 Login: [http://localhost:8080/login](http://localhost:8080/login)
- 🟧 Cadastro: [http://localhost:8080/register](http://localhost:8080/register)
- 📦 Produtos: [http://localhost:8080/products](http://localhost:8080/products)
- 🛒 Carrinho: [http://localhost:8080/cart](http://localhost:8080/cart)

---

## 🔐 Login e Controle de Acesso

### Admin:

```
Email: adminCoder@coder.com
Senha: adminCod3r123
```

### Usuário:

Cadastre-se em `/register`. Após login, será redirecionado para `/products`.

### Login via GitHub:

Acesse `/github` e autorize seu GitHub.

---

## ✅ Funcionalidades

- ✅ Listagem de produtos (Mongo ou FS)
- ✅ Adição ao carrinho por sessão
- ✅ Registro, login local e via GitHub
- ✅ Compra com verificação de estoque
- ✅ Geração de ticket único por compra
- ✅ Controle de acesso com `roleMiddleware`
- ✅ Middleware de erros customizados
- ✅ DTO de usuário para esconder senha
- ✅ Logger com Winston + logs salvos em arquivos
- ✅ Rota de teste de logger (`/loggerTest`)

---

## 🧾 Geração de Tickets

Após finalizar uma compra válida:

- Gera ticket com:
  - Código único
  - Valor total
  - Email do comprador
  - Timestamp

---

## 📋 DTO de Usuário

Evita exposição de dados sensíveis como senha no retorno da API.  
Formato da resposta com DTO:

```json
{
  "name": "Jeffinho Teles",
  "email": "user@email.com",
  "role": "user"
}
```

---

## 🐞 Tratamento de Erros

Middleware `errorHandler` lida com erros lançados no sistema:

- Classe `CustomError`
- Enum `ErrorTypes`
- Exemplo de resposta:

```json
{
  "error": "INVALID_PARAM",
  "message": "Produto não encontrado"
}
```

---

## 📓 Logger com Winston

### Logs salvos em:

- `/logs/errors.log` → erros
- `/logs/combined.log` → todos os logs

### Rota de Teste

```http
GET /loggerTest
```

Exibe logs em diferentes níveis: `debug`, `info`, `warn`, `error`, etc.

---

## 🧪 Testes

### Postman

- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:pid`
- `DELETE /api/products/:pid`
- `POST /api/carts/:cid/purchase`
- `POST /api/tickets`
- `GET /loggerTest`

### Segurança

- Rotas protegidas com autenticação e role
- Admin pode acessar rotas específicas

---

## 🧠 Próximas Funcionalidades

- Painel Admin com CRUD visual
- Histórico de compras do usuário
- Visualização de tickets na interface
- Upload de imagens de produtos

---

## 👨‍💻 Autor

Jeffinho Teles  
Projeto realizado como parte do curso da [CoderHouse](https://www.coderhouse.com.br/)
