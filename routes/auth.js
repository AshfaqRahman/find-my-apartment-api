const express = require('express');
const router = express.Router();



/** 
    * @swagger
    * /auth:
    *      get:
    *           summary: Use to request all customers
    *           responses:
    *               '200':
    *                   description: A successful response
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: array
    *                                  
    *
*/
router.get('/', (req, res) => {
    res.send(["hello"]);
})

module.exports = router;