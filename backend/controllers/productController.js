const productModel = require('../models/productModel');

const createProduct = (req, res) => {

    const { name, quantity, price } = req.body;

    productModel.createProduct(
        name,
        quantity,
        price,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Produto criado com sucesso'
            });

        }
    );

};

const getProducts = (req, res) => {

    productModel.getProducts((err, rows) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(rows);

    });

};

const updateProduct = (req, res) => {

    const { id } = req.params;

    const { quantity } = req.body;

    productModel.updateProduct(
        id,
        quantity,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Produto atualizado com sucesso'
            });

        }
    );

};

const deleteProduct = (req, res) => {

    const { id } = req.params;

    productModel.deleteProduct(id, (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Produto deletado com sucesso'
        });

    });

};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
};