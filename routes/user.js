const express = require('express');
const router = express.Router();



/** 
    * @swagger
    * /user/profile:
    *      get:
    *           responses:
    *               '200':
    *                   description: A successful response
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: object
    *                                  
    *
*/
router.get('/profile', (req, res) => {
    res.send(
        {
            "id": 1,
            "username": "john_doe",
            "email": "john@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "phone_number": "+1234567890",
            "address": "123 Main St, Example City"
        }
    )
      
})

/**
 * @swagger
 * /user/profile:
 *     patch:
 *         requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                  schema:
 *                     type: object
 *                  example:
 *                     email: "john@example.com"
 *                     first_name: "John"
 *                     last_name: "Doe"
 *                     phone_number: "+1234567890"
 *                     address: "123 Main St, Example City"

 * 
 *         responses:
 *           '200':
 *                  description: A successful response
 *           content:
 *              application/json:
 *               schema:
 *                type: object
 * 
 * 
 * 
 */

router.patch('/profile', (req, res) => {
    return res.send(
        {
            id: 1,
            username: "john_doe",
            email: "john@example.com",
            first_name: "John",
            last_name: "Doe",
            phone_number: "+1234567890",
            address: "123 Main St, Example City"
        }
    );
})

/**
 * @swagger
 * /user/change-password:
 *     patch:
 *         requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                  schema:
 *                     type: object
 *                  example:
 *                     current_password: "secretpassword"
 *                     new_password: "newsecretpassword"

 * 
 *         responses:
 *           '200':
 *                  description: A successful response
 *           content:
 *              application/json:
 *               schema:
 *                type: object
 * 
 * 
 * 
 */

router.patch('/change-password', (req, res) => {
    return res.send({
        message: "Password changed successfully"
    });
})

module.exports = router;