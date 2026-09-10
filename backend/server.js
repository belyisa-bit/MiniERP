const express = require('express');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');
const financeRoutes = require('./routes/financeRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/produtos', productRoutes);
app.use('/api/vendas', salesRoutes);
app.use('/api/financeiro', financeRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ erro: 'Ocorreu um erro interno.' });
});

app.listen(port, () => console.log(`MiniERP disponível em http://localhost:${port}`));
