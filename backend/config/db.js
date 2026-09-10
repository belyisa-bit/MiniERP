const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const databasePath = path.join(__dirname, '../database/minierp.db');
const db = new sqlite3.Database(databasePath);

db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON');
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    quantidade INTEGER NOT NULL CHECK (quantidade >= 0),
    preco REAL NOT NULL CHECK (preco >= 0),
    criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS vendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total REAL NOT NULL CHECK (total >= 0),
    criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS itens_venda (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    venda_id INTEGER NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
    produto_id INTEGER NOT NULL REFERENCES produtos(id),
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    preco_unitario REAL NOT NULL CHECK (preco_unitario >= 0)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS financeiro (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL CHECK (tipo IN ('entrada', 'saida')),
    valor REAL NOT NULL CHECK (valor > 0),
    descricao TEXT NOT NULL,
    venda_id INTEGER REFERENCES vendas(id),
    criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;
