🚀 MiniERP

Sistema ERP simples desenvolvido com Node.js, Express e SQLite, com foco na integração entre os módulos de estoque, vendas e financeiro.

📌 Sobre o Projeto

O MiniERP é uma aplicação web criada para simular o funcionamento básico de um ERP real, onde ações realizadas em um módulo impactam automaticamente os outros.

O projeto foi desenvolvido com objetivo de praticar:

Integração entre módulos
CRUD completo
API REST
Regras de negócio
Manipulação de banco de dados
Organização backend/frontend

🎯 Objetivo

Simular um sistema empresarial simples onde:

✅ Produtos são cadastrados no estoque
✅ Vendas reduzem automaticamente o estoque
✅ Entradas financeiras são registradas automaticamente
✅ O sistema mantém histórico de operações

🛠️ Tecnologias Utilizadas
Frontend
HTML5
CSS3
JavaScript
Backend
Node.js
Express.js
Banco de Dados
SQLite

🏗️ Estrutura do Projeto
MiniERP/
│
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md

⚙️ Funcionalidades
📦 Estoque
Cadastro de produtos
Atualização de quantidade
Listagem de produtos

🛒 Vendas
Registro de vendas
Seleção de produtos
Cálculo automático do valor total

💰 Financeiro
Registro automático de entradas
Visualização do saldo
Histórico financeiro

🔗 Regras de Negócio

Ao registrar uma venda:

✅ O estoque é atualizado automaticamente
✅ O valor entra no financeiro
✅ A venda é salva no histórico
🔄 Fluxo do Sistema
Venda realizada
       ↓
Atualização do estoque
       ↓
Registro financeiro
       ↓
Histórico de vendas
🚧 Status do Projeto
🚧 Projeto em desenvolvimento

Funcionalidades em andamento:
- Integração entre módulos
- Dashboard financeiro
- Melhorias na interface
- Histórico de vendas

  
🚀 Como Executar
1️⃣ Clonar repositório
git clone https://github.com/belyisa-bit/MiniERP.git
2️⃣ Instalar dependências
cd backend
npm install
3️⃣ Rodar servidor
node server.js


🌐 API REST
Produtos
Método	Endpoint	Descrição
GET	/produtos	Listar produtos
POST	/produtos	Cadastrar produto
PUT	/produtos/:id	Atualizar estoque
Vendas
Método	Endpoint	Descrição
POST	/vendas	Registrar venda
GET	/vendas	Histórico de vendas
Financeiro
Método	Endpoint	Descrição
GET	/financeiro	Histórico financeiro
GET	/financeiro/saldo	Saldo total


💡 Melhorias Futuras
🔐 Sistema de login
📊 Dashboard com gráficos
📅 Filtro de vendas
📄 Documentação Swagger
👥 Controle de usuários
📚 Aprendizados

Este projeto está sendo desenvolvido para aprofundar conhecimentos em:

Node.js
Express
SQLite
JavaScript
APIs REST
Arquitetura MVC
Regras de negócio
Integração de sistemas


👩‍💻 Desenvolvido por
Isabelle Victória Galdino Santos

🎓 Estudante de Ciência da Computação
📊 Interesse em Dados e Desenvolvimento
💻 Power BI | SQL | JavaScript | Node.js

GitHub:

https://github.com/belyisa-bit

LinkedIn:

https://www.linkedin.com/in/isabelle-victória-b4237a345/
⭐ Contribuições

Sinta-se à vontade para contribuir com melhorias, sugestões ou novas funcionalidades.

📄 Licença

Este projeto está sob a licença MIT.
