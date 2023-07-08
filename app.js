const http = require('http');

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const hostname = '127.0.0.1';
const port = 8000;


app.listen(port, () =>  {
    console.log(`Server running at http://${hostname}:${port}/`);
});