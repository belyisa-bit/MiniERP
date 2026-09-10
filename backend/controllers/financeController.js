const financeiro = require('../models/financeModel');

exports.listar = (_req, res, next) => financeiro.listar((err, rows) => err ? next(err) : res.json(rows));
exports.saldo = (_req, res, next) => financeiro.saldo((err, total) => err ? next(err) : res.json(total));
exports.criar = (req, res, next) => {
  const { tipo } = req.body;
  const valor = Number(req.body.valor);
  const descricao = typeof req.body.descricao === 'string' ? req.body.descricao.trim() : '';
  if (!['entrada', 'saida'].includes(tipo) || !Number.isFinite(valor) || valor <= 0 || !descricao) {
    return res.status(400).json({ erro: 'Informe tipo (entrada ou saída), valor positivo e descrição.' });
  }
  financeiro.criar({ tipo, valor, descricao }, (err, id) => err ? next(err) : financeiro.buscarPorId(id, (findErr, lancamento) => findErr ? next(findErr) : res.status(201).json(lancamento)));
};
