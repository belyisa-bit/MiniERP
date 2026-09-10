const db = require('../config/db');

function criar(itens, callback) {
  const produtoIds = itens.map((item) => item.produto_id);
  const placeholders = produtoIds.map(() => '?').join(',');

  db.serialize(() => {
    db.run('BEGIN IMMEDIATE TRANSACTION');
    db.all(`SELECT id, nome, quantidade, preco FROM produtos WHERE id IN (${placeholders})`, produtoIds, (err, produtos) => {
      if (err) return finalizarComErro(err);
      const porId = new Map(produtos.map((produto) => [produto.id, produto]));
      for (const item of itens) {
        const produto = porId.get(item.produto_id);
        if (!produto) return finalizarComErro(new Error(`Produto ${item.produto_id} não encontrado.`));
        if (produto.quantidade < item.quantidade) return finalizarComErro(new Error(`Estoque insuficiente para ${produto.nome}.`));
      }
      const total = itens.reduce((soma, item) => soma + porId.get(item.produto_id).preco * item.quantidade, 0);
      db.run('INSERT INTO vendas (total) VALUES (?)', [total], function (insertErr) {
        if (insertErr) return finalizarComErro(insertErr);
        const vendaId = this.lastID;
        const inserirItem = db.prepare('INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)');
        const baixarEstoque = db.prepare('UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?');
        itens.forEach((item) => {
          inserirItem.run(vendaId, item.produto_id, item.quantidade, porId.get(item.produto_id).preco);
          baixarEstoque.run(item.quantidade, item.produto_id);
        });
        inserirItem.finalize();
        baixarEstoque.finalize();
        db.run("INSERT INTO financeiro (tipo, valor, descricao, venda_id) VALUES ('entrada', ?, ?, ?)", [total, `Venda #${vendaId}`, vendaId], (financeErr) => {
          if (financeErr) return finalizarComErro(financeErr);
          db.run('COMMIT', (commitErr) => callback(commitErr, commitErr ? null : vendaId));
        });
      });
    });
  });

  function finalizarComErro(err) {
    db.run('ROLLBACK', () => callback(err));
  }
}

function listar(callback) {
  db.all('SELECT * FROM vendas ORDER BY id DESC', (err, vendas) => {
    if (err) return callback(err);
    if (!vendas.length) return callback(null, []);
    const ids = vendas.map((venda) => venda.id);
    db.all(`SELECT iv.*, p.nome AS produto_nome FROM itens_venda iv JOIN produtos p ON p.id = iv.produto_id WHERE iv.venda_id IN (${ids.map(() => '?').join(',')})`, ids, (itensErr, itens) => {
      if (itensErr) return callback(itensErr);
      const itensPorVenda = new Map(vendas.map((venda) => [venda.id, []]));
      itens.forEach((item) => itensPorVenda.get(item.venda_id).push(item));
      callback(null, vendas.map((venda) => ({ ...venda, itens: itensPorVenda.get(venda.id) })));
    });
  });
}

module.exports = { criar, listar };
