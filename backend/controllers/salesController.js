const vendas = require('../models/salesModel');

exports.listar = (_req, res, next) => vendas.listar((err, rows) => err ? next(err) : res.json(rows));
exports.criar = (req, res, next) => {
  const itens = req.body.itens;
  if (!Array.isArray(itens) || !itens.length) return res.status(400).json({ erro: 'Inclua ao menos um item na venda.' });
  const consolidados = new Map();
  for (const item of itens) {
    const produtoId = Number(item.produto_id);
    const quantidade = Number(item.quantidade);
    if (!Number.isInteger(produtoId) || produtoId < 1 || !Number.isInteger(quantidade) || quantidade < 1) {
      return res.status(400).json({ erro: 'Cada item precisa de produto_id e quantidade inteiros positivos.' });
    }
    consolidados.set(produtoId, (consolidados.get(produtoId) || 0) + quantidade);
  }
  const itensValidos = [...consolidados].map(([produto_id, quantidade]) => ({ produto_id, quantidade }));
  vendas.criar(itensValidos, (err, id) => {
    if (err) {
      if (/não encontrado|Estoque insuficiente/.test(err.message)) return res.status(400).json({ erro: err.message });
      return next(err);
    }
    res.status(201).json({ id, mensagem: 'Venda registrada e financeiro atualizado.' });
  });
};
