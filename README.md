# 🚀 MiniERP

Sistema ERP simples desenvolvido com Node.js, Express e SQLite, com foco na integração entre estoque, vendas e financeiro.

### 📌 Sobre o projeto
O MiniERP simula um sistema ERP real, onde ações em um módulo impactam automaticamente os outros.

O objetivo é praticar:
- API REST CRUD
- Integração entre módulos
- Banco de dados (SQLite)
- Organização de backend

### 🎯 Funcionalidades

**📦 Estoque**
- Cadastro de produtos
- Listagem de produtos
- Atualização de quantidade

**🛒 Vendas**
- Registro de vendas
- Seleção de produtos
- Cálculo automático do total

**💰 Financeiro**
- Entrada automática após vendas
- Controle de saldo
- Histórico financeiro

### 🔗 Regras de negócio
Ao registrar uma venda:
- O estoque é reduzido automaticamente
- O valor é registrado no financeiro
- A venda fica salva no histórico

### 🛠️ Tecnologias
- HTML, CSS, JavaScript
- Node.js
- Express
- SQLite

### 📁 Estrutura do projeto
```text
MiniERP/
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js

### 👩‍💻 Desenvolvido por

Isabelle Victória Galdino Santos
Estudante de Ciência da Computação

### GitHub: https://github.com/belyisa-bit
### LinkedIn: https://www.linkedin.com/in/isabelle-victória-b4237a345/
