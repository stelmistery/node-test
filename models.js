const dbModule = require('./db');

const db = new dbModule.DBPool();

class Book {
    constructor(title = null, date = null, author = null, description = null, image = null) {
        this.title = title;
        this.date = date;
        this.author = author;
        this.description = description;
        this.image = image;
    }

    get_all(callback) {
        let sql = 'SELECT * FROM library.books';
        let result = db.pool.query(sql, (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                console.log(`query [${sql}] successfully`)
                callback(null, res)
            }
        });
    };

    get_book(id ,callback) {
        let sql = 'SELECT * FROM library.books WHERE id = ?';
        db.pool.query(sql, [id], (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                console.log(`query [${sql}] successfully`)
                callback(null, res)
            }
        });
    };
}

module.exports.Book = Book;