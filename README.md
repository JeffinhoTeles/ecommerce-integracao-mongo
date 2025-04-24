# 🛒 Projeto E-commerce com Carrinho - CoderHouse

Sistema de e-commerce desenvolvido como atividade da CoderHouse.  
A aplicação permite cadastrar e listar produtos, adicionar produtos ao carrinho por sessão, visualizar os itens e finalizar a compra — tudo integrado com MongoDB, Express, Handlebars e agora com sistema de login e controle de acesso.

---

## 🚀 Tecnologias Usadas

- Node.js
- Express
- MongoDB + Mongoose
- Handlebars
- Express-session
- dotenv

---

## 📁 Estrutura

📁 src/ ┣ 📂 dao/ ┃ ┣ 📂 db/ # Lógica de acesso via Mongo ┃ ┣ 📂 fs/ # FileSystem (apenas para testes) ┃ ┗ 📂 models/ # Models do Mongoose ┣ 📂 routes/ # Rotas das APIs e Views ┣ 📂 views/ # Templates Handlebars ┣ 📂 middlewares/ # Sessão e autenticação ┣ 📄 app.js # App principal ┗ 📄 dbConfig.js # Config de conexão com MongoDB

yaml
Copiar
Editar

---

## ⚙️ Configuração do Ambiente

Crie um arquivo `.env` na raiz com sua URI do MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
▶️ Como Rodar o Projeto
Clone o projeto

bash
Copiar
Editar
git clone https://github.com/seuusuario/seurepositorio.git
cd seurepositorio
Instale as dependências

bash
Copiar
Editar
npm install
Rode o servidor

bash
Copiar
Editar
node src/app.js
🌐 Acessos no Navegador
🟦 Login: http://localhost:8080/login

🟧 Cadastro: http://localhost:8080/register

📦 Produtos: http://localhost:8080/products

🛒 Carrinho: http://localhost:8080/cart

🔐 Sistema de Login (Admin ou Usuário)
🧪 Admin (hardcoded):
Email: adminCoder@coder.com

Senha: adminCod3r123

👥 Usuário comum:
Cadastre-se em /register

Após login, é redirecionado para /products

🧪 Como Testar
✅ 1. Login
Acesse /login e entre como admin ou usuário.
Você será redirecionado para /products.

✅ 2. Visualização de dados
Na página de produtos será exibido:

scss
Copiar
Editar
Bem-vindo, Jeffinho (admin)
ou

scss
Copiar
Editar
Bem-vindo, SeuNome (user)
botão de Logout

✅ 3. Proteção de Rotas
Rotas como /products e /cart exigem autenticação.
Sem estar logado, você será redirecionado automaticamente para /login.

✅ 4. Logout
Ao clicar em "Logout", sua sessão é encerrada e o acesso às páginas protegidas é bloqueado até novo login.

✅ Funcionalidades
 Listagem de produtos (MongoDB)

 Carrinho por sessão

 Finalização de compra

 Registro e login de usuários

 Controle de acesso com middleware

 Role system (admin vs user)

 Histórico de compras (em breve)

 Edição e exclusão de produtos (em breve)

👨‍💻 Autor
Jeffinho Teles
```
