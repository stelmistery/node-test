const dbModule = require('./db');
const moment = require('moment')

const db = new dbModule.DBPool();

class Book {
    constructor(title = null, date = null, author = null, description = null, image = null) {
        this.title = title;
        this.date = date;
        this.author = author;
        this.description = description;
        this.image = image;
    }

    create_book(body, callback) {
        let sql = 'INSERT INTO library.books(title, author_id, description, date,  image) VALUES (?, ?, ?, ?, ?);';
        let sql_args = [body.title, body.author_id, body.description, moment().format(), body.image];
        db.pool.query(sql, sql_args, (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                console.log(`query [${sql}] successfully`)
                callback(null, res)
            }
        });
    };

    get_all(callback) {
        let sql = 'SELECT * FROM library.books';
        db.pool.query(sql, (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                console.log(`query [${sql}] successfully`)
                callback(null, res)
            }
        });
    };

    get_book(id, callback) {
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

    get_by(body, callback) {
        let argsForQuery = []
        if (body === undefined) {
            let default_sql = 'SELECT * FROM library.books ORDER BY books.id';
            db.pool.query(default_sql, (err, res) => {
                if (err) {
                    callback(err, null);
                } else {
                    console.log(`query [${sql}] successfully`);
                    callback(null, res);
                }
            });
        } else {
            let building_sql = 'SELECT * FROM library.books';

            if (body.sort_field) {
                let sortField = body.sort_field;
                building_sql += ' ORDER BY ' + sortField;
            }

            if (body.sort_type) {
                let sortType = body.sort_type.toUpperCase();
                building_sql += ' ' + sortType;
            }

            if (body.limit && body.page && body.offset) {
                let offset = Number(Number(body.offset) + Number(body.limit * (body.page - 1)));
                let limit = Number(body.limit);
                argsForQuery.push(offset, limit);
                building_sql += ' LIMIT ?, ?';

            } else if (body.limit && body.offset) {
                let offset = Number(body.offset);
                let limit = Number(body.limit);
                argsForQuery.push(offset, limit);
                building_sql += ' LIMIT ?, ?';

            } else if (body.limit && body.page) {
                let limit = Number(body.limit);
                let offset = Number(limit * (body.page - 1));
                argsForQuery.push(offset, limit);
                building_sql += ' LIMIT ?, ?';

            } else if (body.limit) {
                let limit = Number(body.limit);
                argsForQuery.push(limit);
                building_sql += ' LIMIT ?';
            }
            let sql = building_sql + ';';
            console.log(sql);
            console.log(argsForQuery);
            db.pool.query(sql, argsForQuery, (err, res) => {
                if (err) {
                    callback(err, null);
                } else {
                    console.log(`query [${sql}] successfully`);
                    callback(null, res);
                }
            });
        }
    }

    book_update(id, newBody, callback) {
        let sql = 'SELECT * FROM library.books WHERE id = ?';
        const p = new Promise((resolve, reject) => {
            db.pool.query(sql, [id], (err, res) => {
                if (err) {
                    callback(err, null);
                } else {
                    console.log(`query [${sql}] successfully`);
                    resolve(res[0]);
                }
            });
        }).then((book_data_db) => {
            let sql = 'UPDATE library.books SET title = ?, author_id = ?, description = ?, image = ? WHERE id = ?';
            let sqlArgs = [];
            let title = (newBody.title) ? newBody.title : book_data_db.title;
            let author_id = (newBody.author_id) ? newBody.author_id : book_data_db.author_id;
            let description = (newBody.description) ? newBody.description : book_data_db.description;
            let image = (newBody.image) ? newBody.image : book_data_db.image;
            sqlArgs.push(title, author_id, description, image, id);
            db.pool.query(sql, sqlArgs, (err, res) => {
                if (err) {
                    callback(err, null);
                } else {
                    console.log(`query [${sql}] successfully`);
                    callback(null, res);
                }
            });
        });
    }
}

module.exports.Book = Book;