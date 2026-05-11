const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/database.db', (err) => {

    if (err) {
        console.error(err.message);
    } else {

        console.log('Conectado ao banco SQLite.');

        db.run(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                price REAL NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS sales (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id INTEGER,
                quantity INTEGER,
                total REAL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS finance (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT,
                amount REAL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

    }

});

module.exports = db;