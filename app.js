

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
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
                "url": "http://127.0.0.1:8000"
            }
        ]
    },
    "apis": ["./routes/*.js"]
}

let swaggerDocument = swaggerJsDoc(options);


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const hostname = '127.0.0.1';
const port = 8000;

app.use('/', router);

app.listen(port, () =>  {
    console.log(`Server running at http://${hostname}:${port}/`);
});