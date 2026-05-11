const db = require('../config/db');

const createProduct = (name, quantity, price, callback) => {

    db.run(
        'INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)',
        [name, quantity, price],
        callback
    );

};

const getProducts = (callback) => {

    db.all(
        'SELECT * FROM products',
        callback
    );

};

const updateProduct = (id, quantity, callback) => {

    db.run(
        'UPDATE products SET quantity = ? WHERE id = ?',
        [quantity, id],
        callback
    );

};

const deleteProduct = (id, callback) => {

    db.run(
        'DELETE FROM products WHERE id = ?',
        [id],
        callback
    );

};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
};