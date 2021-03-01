const Book = require('../models/book.js').Book
exports.bookall = function (request, response) {
    let b = new Book();
    b.get_all((err, res) => {
        if (err) {
            throw err;
        }
        response.send(res);
    });
}

exports.get_by = function (request, response) {
    let b = new Book();
    b.get_by(request.query, (err, res) => {
        if (err) {
            response.sendStatus(500);
            throw err;
        }
        response.send(res);
    });
}

exports.get_one = function (request, response) {
    let b = new Book();
    b.get_book(Number(request.params.id), (err, res) => {
        if (err) {
            throw err
        }
        response.send(res);
    });
}

exports.create = function (request, response) {
    if (request.body !== undefined) {
        if (request.body.length === 1) {
            let b = new Book();
            b.create_book(request.body[0], (err, res) => {
                if (err) {
                    throw err
                }
                response.send(res);
            });
        } else {
            response.status(400);
            response.set('Content-Type', 'text/json');
            response.json('Only one book can be saved');
        }
    } else {
        response.sendStatus(400)
    }
}

exports.update_one = function (request, response) {
    if (request.body !== undefined) {
        if (request.body.length === 1) {
            let b = new Book();
            b.book_update(request.params.id, request.body[0], (err, res) => {
                if (err) {
                    throw err
                }
                response.send(res);
            });
        }
    }
}

exports.delete_one = function (request, response) {
    let id = request.params.id;
    if (typeof id !== "number") {
        let b = new Book();
        b.book_delete(id, (err, res) => {
            if (err) {
                throw err
            }
            response.send(res);
        });
    }
}