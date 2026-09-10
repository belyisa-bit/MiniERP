const produtos = require('../models/productModel');

function dadosValidos(body) {
  const nome = typeof body.nome === 'string' ? body.nome.trim() : '';
  const quantidade = Number(body.quantidade);
  const preco = Number(body.preco);
  if (!nome || !Number.isInteger(quantidade) || quantidade < 0 || !Number.isFinite(preco) || preco < 0) return null;
  return { nome, quantidade, preco };
}

exports.listar = (_req, res, next) => produtos.listar((err, rows) => err ? next(err) : res.json(rows));
exports.buscar = (req, res, next) => produtos.buscarPorId(req.params.id, (err, produto) => {
  if (err) return next(err);
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado.' });
  res.json(produto);
});
exports.criar = (req, res, next) => {
  const dados = dadosValidos(req.body);
  if (!dados) return res.status(400).json({ erro: 'Informe nome, quantidade inteira não negativa e preço não negativo.' });
  produtos.criar(dados, (err, id) => err ? next(err) : produtos.buscarPorId(id, (findErr, produto) => findErr ? next(findErr) : res.status(201).json(produto)));
};
exports.atualizar = (req, res, next) => {
  const dados = dadosValidos(req.body);
  if (!dados) return res.status(400).json({ erro: 'Informe nome, quantidade inteira não negativa e preço não negativo.' });
  produtos.atualizar(req.params.id, dados, (err, changes) => {
    if (err) return next(err);
    if (!changes) return res.status(404).json({ erro: 'Produto não encontrado.' });
    produtos.buscarPorId(req.params.id, (findErr, produto) => findErr ? next(findErr) : res.json(produto));
  });
};
exports.atualizarQuantidade = (req, res, next) => {
  const quantidade = Number(req.body.quantidade);
  if (!Number.isInteger(quantidade) || quantidade < 0) return res.status(400).json({ erro: 'Quantidade deve ser um inteiro não negativo.' });
  produtos.atualizarQuantidade(req.params.id, quantidade, (err, changes) => {
    if (err) return next(err);
    if (!changes) return res.status(404).json({ erro: 'Produto não encontrado.' });
    produtos.buscarPorId(req.params.id, (findErr, produto) => findErr ? next(findErr) : res.json(produto));
  });
};
exports.remover = (req, res, next) => produtos.remover(req.params.id, (err, changes) => {
  if (err && err.code === 'SQLITE_CONSTRAINT') return res.status(409).json({ erro: 'Este produto possui vendas e não pode ser removido.' });
  if (err) return next(err);
  if (!changes) return res.status(404).json({ erro: 'Produto não encontrado.' });
  res.status(204).end();
});
