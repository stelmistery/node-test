const Book = require('../models/book.js').Book
exports.bookall = async function (request, response) {
    let b = new Book();
    try {
        let res = await b.get_all();
    } catch (err) {
        response.sendStatus(500);
        response.send({ err: err.message })
    }
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

exports.get_by_pr = async function (request, response) {
    let b = new Book();
    try {
        let res = await b.get_by_pr(request.query)
        response.send(res)
    } catch (err) {
        response.sendStatus(500)
        response.send({ error: err.message })
    }
}

exports.get_one = async function (request, response) {
    let b = new Book();
    try {
        let res = await b.get_book(Number(request.params.id))
        response.send(res);
    } catch (err) {
        response.sendStatus(500)
        response.sen({ error: err.message })
    }
}

exports.create = async function (request, response) {
    if (request.body !== undefined) {
        if (request.body.length === 1) {
            let b = new Book();
            try {
                let res = await b.create_book(request.body[0]);
            } catch (err) {
                response.sendStatus(500);
                response.send({ err: err.message });
            }
        } else {
            response.status(400);
            response.set('Content-Type', 'text/json');
            response.json('Only one book can be saved');
        }
    } else {
        response.sendStatus(400)
    }
}

exports.update_one = async function (request, response) {
    if (request.body !== undefined) {
        if (request.body.length === 1) {
            let b = new Book();
            try {
                let res = await b.book_update(request.params.id, request.body[0]);
                response.send(res);
            } catch (err) {
                response.sendStatus(500);
                response.sendError({ err: err.message });
            }
        }
    }
}

exports.delete_one = async function (request, response) {
    let id = request.params.id;
    if (typeof id !== "number") {
        let b = new Book();
        try {
            let res = await b.book_delete(id);
            response.send(res);
        } catch (err) {
            response.sendStatus(500);
            response.sendError({ err: err.message });
        }
    }
}