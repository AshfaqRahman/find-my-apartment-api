
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
// const swaggerDocument = require('./swagger.json');

const router = require('./routes/routes');
app.use('/api', router);

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const options = {
    "definition": {
        "openapi": "3.1.0",
        "info": {
            "title": "Find your apartment",
            "description": "API endpoints",
            "version": "1.0.0"
        },
        "server": [
            {
                "url": `http://${hostname}:${port}`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer token to access these api endpoints',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: [],
        },
        ],
    },
    "apis": ["./routes/*.js"]
}

let swaggerDocument = swaggerJsDoc(options);


app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () =>  {
    console.log(`Server running at http://${hostname}:${port}/`);
});