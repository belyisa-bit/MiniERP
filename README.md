# MiniERP

Primeira versão de um ERP simples para controlar estoque, vendas e financeiro. A venda baixa o estoque e cria a entrada financeira correspondente dentro de uma transação única no SQLite.

## Como executar

```bash
cd backend
npm install
npm start
```

Abra http://localhost:3000. Para desenvolvimento, use `npm run dev`.

O arquivo do banco é criado automaticamente em `backend/database/minierp.db` na primeira execução.

## Recursos disponíveis

- Cadastro, listagem, edição, ajuste de quantidade e remoção de produtos;
- Carrinho e confirmação de vendas, com validação de estoque;
- Baixa automática do estoque após uma venda;
- Entrada automática no financeiro para cada venda;
- Lançamentos manuais de entrada e saída e saldo consolidado;
- Interface web simples servida pelo próprio backend.

## API

| Módulo | Rotas |
| --- | --- |
| Produtos | `GET/POST /api/produtos`, `GET/PUT/DELETE /api/produtos/:id`, `PATCH /api/produtos/:id/quantidade` |
| Vendas | `GET/POST /api/vendas` |
| Financeiro | `GET/POST /api/financeiro`, `GET /api/financeiro/saldo` |

Exemplo para registrar uma venda:

```json
{
  "itens": [{ "produto_id": 1, "quantidade": 2 }]
}
```

## Estrutura

```
backend/
  config/        conexão e criação das tabelas
  controllers/   validações e respostas HTTP
  models/        consultas e transação de venda
  routes/        rotas da API
  database/      banco SQLite criado em execução
frontend/        interface HTML, CSS e JavaScript
```
