# 🛒 Projeto E-commerce com Carrinho - CoderHouse

Sistema de e-commerce desenvolvido como atividade da CoderHouse.  
A aplicação permite cadastrar e listar produtos, adicionar produtos ao carrinho por sessão, visualizar os itens e finalizar a compra — tudo integrado com MongoDB, Express e Handlebars.

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

📁 src/ ┣ 📂 dao/ ┃ ┣ 📂 db/ # Lógica de acesso via Mongo ┃ ┣ 📂 fs/ # FileSystem (apenas para testes) ┃ ┗ 📂 models/ # Models do Mongoose ┣ 📂 routes/ # Rotas das APIs e Views ┣ 📂 views/ # Templates Handlebars ┣ 📂 middlewares/ # Sessão e auth ┣ 📄 app.js # App principal ┗ 📄 dbConfig.js # Config de conexão com MongoDB

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
📦 Lista de Produtos: http://localhost:8080/products

🛒 Carrinho: http://localhost:8080/cart

🧾 Finalizar Compra: Botão dentro da página /cart

🧪 Como Testar
✅ 1. Acesse a lista de produtos
Vá até: http://localhost:8080/products

Você verá os produtos cadastrados (MongoDB)

✅ 2. Adicione ao carrinho
Clique no botão "Adicionar ao Carrinho" em algum produto

✅ 3. Visualize o carrinho
Clique em "Ver Carrinho" no topo da página de produtos

✅ 4. Finalize a compra
Clique em "Finalizar Compra"

O sistema irá calcular o total, limpar o carrinho e exibir o valor da compra

✅ Funcionalidades
 Produtos paginados com MongoDB

 Carrinho dinâmico por sessão

 Adição de produtos ao carrinho

 Visualização de carrinho com populate

 Finalização da compra com cálculo de total

 Histórico de compras (em breve)

 Cadastro/login de usuário (em breve)

👨‍💻 Autor
Jeffinho Teles
```
