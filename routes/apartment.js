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

/** 
    * @swagger
    * /apartments:
    *      post:
    *           summary: apartments post
    *           requestBody:
    *               required: true
    *               content:
    *                   application/json:
    *                       schema:
    *                           type: object
    *                       example:
    *                           id: "408"
    *                           address: "BUET"
    *                           price: "20000"
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

router.post('/', (req, res) => {
    res.send({
        "Apartment no.": req.body.id, 
        Address: req.body.address, 
        Price: req.body.price}
    ).status(200);
})

module.exports = router;