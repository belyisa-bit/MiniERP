# 🚀 MiniERP

Sistema ERP simples desenvolvido com Node.js, Express e SQLite, com foco na integração entre **estoque**, **vendas** e **financeiro**.

## 📌 Sobre o projeto

O MiniERP simula um sistema ERP real, onde ações em um módulo impactam automaticamente os outros. Ao registrar uma venda, o estoque é reduzido e o valor é lançado automaticamente no financeiro — tudo dentro de uma única transação no banco de dados.

## ▶️ Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar o servidor
npm start
```

O servidor sobe em **http://localhost:3000**, servindo tanto a API quanto o frontend.

O banco SQLite (`backend/database/minierp.db`) é criado automaticamente na primeira execução — nenhuma configuração manual é necessária.

> Modo desenvolvimento com auto-reload: `npm run dev` (usa `node --watch`, requer Node 18.11+).

## 🎯 Funcionalidades

### 📦 Estoque
- Cadastro de produtos (nome, quantidade, preço)
- Listagem de produtos
- Atualização de quantidade (ajuste rápido +/- ou edição direta)
- Remoção de produtos

### 🛒 Vendas
- Seleção de produtos e quantidades (carrinho)
- Cálculo automático do total
- Validação de estoque disponível antes de confirmar
- Histórico de vendas com itens

### 💰 Financeiro
- Entrada automática após cada venda
- Lançamentos manuais (entrada/saída)
- Saldo consolidado (entradas − saídas)
- Histórico financeiro completo

## 🔗 Regra de negócio principal

Ao registrar uma venda (`POST /api/vendas`):
1. O sistema valida se há estoque suficiente para **todos** os itens.
2. A venda e seus itens são salvos.
3. O estoque de cada produto é reduzido.
4. Uma entrada é lançada automaticamente no financeiro.

Todo esse fluxo roda dentro de uma **transação SQLite** (`backend/models/saleModel.js`): se qualquer etapa falhar, nada é gravado — garantindo que estoque, vendas e financeiro nunca fiquem dessincronizados.

## 🛠️ Tecnologias

- HTML, CSS, JavaScript (frontend puro, sem framework)
- Node.js + Express
- SQLite (via `better-sqlite3`)

## 📁 Estrutura do projeto

```
MiniERP/
├── backend/
│   ├── controllers/       # Regras de entrada/saída HTTP (validações, respostas)
│   │   ├── productController.js
│   │   ├── saleController.js
│   │   └── financeController.js
│   ├── database/
│   │   └── db.js          # Conexão SQLite + criação das tabelas
│   ├── models/             # Acesso a dados e regras de negócio
│   │   ├── productModel.js
│   │   ├── saleModel.js    # Integra estoque + financeiro na venda
│   │   └── financeModel.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── saleRoutes.js
│   │   └── financeRoutes.js
│   └── server.js
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```

## 📡 API

### Produtos — `/api/produtos`
| Método | Rota                   | Descrição                    |
|--------|------------------------|-------------------------------|
| GET    | `/`                    | Lista todos os produtos       |
| GET    | `/:id`                 | Busca um produto              |
| POST   | `/`                    | Cria um produto `{nome, quantidade, preco}` |
| PUT    | `/:id`                 | Atualiza um produto           |
| PATCH  | `/:id/quantidade`      | Atualiza só a quantidade `{quantidade}` |
| DELETE | `/:id`                 | Remove um produto             |

### Vendas — `/api/vendas`
| Método | Rota  | Descrição |
|--------|-------|-----------|
| GET    | `/`   | Lista todas as vendas com itens |
| GET    | `/:id`| Busca uma venda |
| POST   | `/`   | Registra uma venda `{itens: [{produto_id, quantidade}]}` |

### Financeiro — `/api/financeiro`
| Método | Rota      | Descrição |
|--------|-----------|-----------|
| GET    | `/`       | Lista o histórico financeiro |
| GET    | `/saldo`  | Retorna `{totalEntradas, totalSaidas, saldo}` |
| POST   | `/`       | Lançamento manual `{tipo: "entrada"\|"saida", valor, descricao}` |

## 💡 Próximos passos sugeridos

- Autenticação de usuários
- Edição de vendas / cancelamento com estorno de estoque
- Relatórios (vendas por período, produtos mais vendidos)
- Paginação nas listagens
