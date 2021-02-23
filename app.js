const models = require('./models');
const express = require("express");
const fs = require("fs");


const app = express();
const jsonParser = express.json();
const bookApi = express.Router();
// app.use(express.static(__dirname + "/public"));

app.use("/api", bookApi);

app.get('/', function (request, response) {
    response.set('Content-Type', 'text/html')
    response.send('<h1>Hop hey lalaley</h1>')
})

bookApi.get('/books', function (request, response) {
    let b = new models.Book();
    b.get_all((err, res) => {
        if (err) {
            console.log(err);
            throw err
        }
        response.send(res);
    });
});

bookApi.get('/book/:id', function (request, response) {
    let b = new models.Book();
    b.get_book(request.params.id, (err, res) => {
        if (err) {
            console.log(err);
            throw err
        }
        response.send(res);
    });
});

bookApi.post('/book/create', jsonParser, function (request, response) {
    console.log(request.body.length);
    if (request.body !== undefined) {
        if (request.body.length === 1) {
            let b = new models.Book();
            b.create_book(request.body[0], (err, res) => {
                if (err) {
                    console.log(err);
                    throw err
                }
                response.send(res);
            });
        } else {
            response.status(400);
            response.set('Content-Type', 'text/json')
            response.json('Only one book can be saved')
        }
    } else {
        response.sendStatus(400)
    }
});

app.listen(3000, () => {
    console.log('Сервер слушает...')
});