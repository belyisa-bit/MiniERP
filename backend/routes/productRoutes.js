const router = require('express').Router();
const controller = require('../controllers/productController');

router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.patch('/:id/quantidade', controller.atualizarQuantidade);
router.delete('/:id', controller.remover);

module.exports = router;
