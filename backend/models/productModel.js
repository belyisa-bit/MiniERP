const db = require('../config/db');

const listar = (callback) => db.all('SELECT * FROM produtos ORDER BY id DESC', callback);
const buscarPorId = (id, callback) => db.get('SELECT * FROM produtos WHERE id = ?', [id], callback);
const criar = ({ nome, quantidade, preco }, callback) => {
  db.run('INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)', [nome, quantidade, preco], function (err) {
    callback(err, err ? null : this.lastID);
  });
};
const atualizar = (id, { nome, quantidade, preco }, callback) => {
  db.run('UPDATE produtos SET nome = ?, quantidade = ?, preco = ? WHERE id = ?', [nome, quantidade, preco, id], function (err) {
    callback(err, this.changes);
  });
};
const atualizarQuantidade = (id, quantidade, callback) => {
  db.run('UPDATE produtos SET quantidade = ? WHERE id = ?', [quantidade, id], function (err) {
    callback(err, this.changes);
  });
};
const remover = (id, callback) => {
  db.run('DELETE FROM produtos WHERE id = ?', [id], function (err) { callback(err, this.changes); });
};

module.exports = { listar, buscarPorId, criar, atualizar, atualizarQuantidade, remover };
