const db = require('../config/db');

const listar = (callback) => db.all('SELECT * FROM financeiro ORDER BY id DESC', callback);
const saldo = (callback) => db.get(`SELECT
  COALESCE(SUM(CASE WHEN tipo = 'entrada' THEN valor END), 0) AS totalEntradas,
  COALESCE(SUM(CASE WHEN tipo = 'saida' THEN valor END), 0) AS totalSaidas
  FROM financeiro`, (err, resultado) => {
  if (err) return callback(err);
  callback(null, { ...resultado, saldo: resultado.totalEntradas - resultado.totalSaidas });
});
const criar = ({ tipo, valor, descricao }, callback) => db.run(
  'INSERT INTO financeiro (tipo, valor, descricao) VALUES (?, ?, ?)', [tipo, valor, descricao], function (err) { callback(err, this.lastID); }
);
const buscarPorId = (id, callback) => db.get('SELECT * FROM financeiro WHERE id = ?', [id], callback);

module.exports = { listar, saldo, criar, buscarPorId };
