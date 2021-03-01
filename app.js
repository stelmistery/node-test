const models = require('./models/book');
const express = require("express");
const fs = require("fs");
const swaggerUi = require('swagger-ui-express');

const bookApiRouter = require('./router/bookapiRouter');
const fileApiRouter = require('./router/fileapiRouter');
// const swaggerDocument = require('./swagger.json');
var options = {
    swaggerOptions: {
        url: 'http://petstore.swagger.io/v2/swagger.json'
    }
}

const app = express();

app.get('/', function (request, response) {
    response.set('Content-Type', 'text/html');
    response.send('<h1>Hop hey lalaley</h1>');
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));
app.use("/api/file", fileApiRouter);
app.use("/api/book", bookApiRouter);



app.listen(3000, () => {
    console.log('Сервер слушает...')
});
