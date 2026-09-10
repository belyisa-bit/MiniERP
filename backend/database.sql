CREATE TABLE produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  quantidade INTEGER NOT NULL CHECK (quantidade >= 0),
  preco REAL NOT NULL CHECK (preco >= 0),
  criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vendas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  total REAL NOT NULL CHECK (total >= 0),
  criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itens_venda (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  venda_id INTEGER NOT NULL REFERENCES vendas(id),
  produto_id INTEGER NOT NULL REFERENCES produtos(id),
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  preco_unitario REAL NOT NULL CHECK (preco_unitario >= 0)
);

CREATE TABLE financeiro (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo TEXT NOT NULL CHECK (tipo IN ('entrada', 'saida')),
  valor REAL NOT NULL CHECK (valor > 0),
  descricao TEXT NOT NULL,
  venda_id INTEGER REFERENCES vendas(id),
  criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
