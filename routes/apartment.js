const express = require('express');
const router = express.Router();

/** 
    * @swagger
    * /apartments:
    *      get:
    *           summary: Request for apartments
    *           responses:
    *               '200':
    *                   description: OK
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: object
    *                                  
    *
*/

router.get('/', (req, res) => {
    res.send(["Apartments"]);
})

router.get('/:id', (req, res) => {
    res.send([
        `Apartment no.: ${req.params.id}`]
    ).status(200);
})

module.exports = router;