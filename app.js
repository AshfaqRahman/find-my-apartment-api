
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// const swaggerDocument = require('./swagger.json');

const router = require('./routes/routes');
app.use('/api', router);

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
                "url": "http://127.0.0.1:8000"
            }
        ]
    },
    "apis": ["./routes/*.js"]
}

let swaggerDocument = swaggerJsDoc(options);


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, () =>  {
    console.log(`Server running at http://${hostname}:${port}/`);
});