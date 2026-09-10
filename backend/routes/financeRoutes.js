const router = require('express').Router();
const controller = require('../controllers/financeController');

router.get('/', controller.listar);
router.get('/saldo', controller.saldo);
router.post('/', controller.criar);

module.exports = router;
