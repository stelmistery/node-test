const models = require('./models');
const express = require("express");
const fs = require("fs");
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
var options = {
    swaggerOptions: {
        url: 'http://petstore.swagger.io/v2/swagger.json'
    }
}
const app = express();
const jsonParser = express.json();
const bookApi = express.Router();
const fileApi = express.Router();

// app.use(express.static(__dirname + "/public"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));
app.use("/api/file", fileApi);
app.use("/api/book", bookApi);

app.get('/', function (request, response) {
    response.set('Content-Type', 'text/html');
    response.send('<h1>Hop hey lalaley</h1>');
})

bookApi.get('/all', function (request, response) {
    let b = new models.Book();
    b.get_all((err, res) => {
        if (err) {
            throw err;
        }
        response.send(res);
    });
});

bookApi.get('/get_by', jsonParser, function (request, response) {
    let b = new models.Book();
    b.get_by(request.query, (err, res) => {
        if (err) {
            response.sendStatus(500);
            throw err;
        }
        response.send(res);
    });
});

bookApi.get('/:id', function (request, response) {
    let b = new models.Book();
    b.get_book(Number(request.params.id), (err, res) => {
        if (err) {
            throw err
        }
        response.send(res);
    });
});

bookApi.post('/create', jsonParser, function (request, response) {
    if (request.body !== undefined) {
        if (request.body.length === 1) {
            let b = new models.Book();
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
});

bookApi.put('/update/:id', jsonParser, function (request, response) {
    if (request.body !== undefined) {
        if (request.body.length === 1) {
            let b = new models.Book();
            b.book_update(request.params.id, request.body[0], (err, res) => {
                if (err) {
                    throw err
                }
                response.send(res);
            });
        }
    }
})

bookApi.delete('/delete/:id', (request, response) => {
    let id = request.params.id;
    if (typeof id !== "number") {
        let b = new models.Book();
        b.book_delete(id, (err, res) => {
            if (err) {
                throw err
            }
            response.send(res);
        });
    }
});

fileApi.get('/write', jsonParser, (request, response) => {
    let data = request.body[0].body;
    try {
        fs.appendFileSync('testFile.txt', data + '\n');
    } catch (err) {
        console.log('Write file error');
        throw err;
    }
    response.status(200);
    response.set('Content-Type', 'text/json');
    response.json('Write file success');
});


app.listen(3000, () => {
    console.log('Сервер слушает...')
});