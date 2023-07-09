const express = require('express');
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *      type: object
 *      required:
 *          - name
 *      properties:
    *     name:
    *      type: string
    *      description: name of the customer
 *      example:
 *         name: John Doe
 *    
 * 
 */

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
    *                               items:
    *                                  $ref: '#/components/schemas/Customer'
    *                                  
    *
*/
router.get('/auth', (req, res) => {
    const customers = [
        {name: 'John Doe'},
        {name: 'Steve Smith'},
        {name: 'William Johnson'}
    ];
    console.log(customers);
    res.send(customers).status(200);
})

module.exports = router;