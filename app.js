const models = require('./models');
const express = require("express");
const fs = require("fs");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

app.get('/api/books', function (request, respond) {
    let b = new models.Book();
    b.get_all((err, res) => {
        if (err) {console.log(err);}
        respond.send(res);
    });
});

app.get('/api/books/:id', function (request, respond) {
    let b = new models.Book();
    b.get_book(request.params.id, (err, res) => {
        if (err) {console.log(err);}
        respond.send(res);
    });
});

app.listen(3000, () => {
    console.log('Сервер слушает...')
});