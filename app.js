

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerDocument = require('./swagger.json');

const router = require('./routes/routes');

const options = {
    "definition": {
        "openapi": "3.1.0",
        "info": {
            "title": "home finder",
            "description": "find your apartment",
            "version": "1.0.0"
        },
        "server": [
            {
                "url": "http://localhost:8000"
            }
        ]
    },
    "apis": ["./routes/*.js"]
}

let swaggerDocument = swaggerJsDoc(options);


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const hostname = 'localhost';
const port = 8000;

app.use('/', router);

app.listen(port, () =>  {
    console.log(`Server running at http://${hostname}:${port}/`);
});