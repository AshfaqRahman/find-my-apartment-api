const express = require('express');
const router = express.Router();
const apartments = require("../db/apartment");
const users = require("../db/user");

/**
 * @swagger
 * tags:
 *  name: User
 *  description: user profile endpoints
 */


/** 
    * @swagger
    * /user/profile:
    *      get:
    *           summary: Request for user profile
    *           tags: [User]
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
        users[0]
    )
      
})

/**
 * @swagger
 * /user/profile:
 *     patch:
 *         summary: Request for update user profile
 *         tags: [User]
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
        users[0]
    );
})

/**
 * @swagger
 * /user/change-password:
 *     patch:
 *         summary: Request for change password
 *         tags: [User]
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

/**
 * @swagger
 * /user/wishlist:
 *     get:
 *         summary: Request for get wishlist
 *         tags: [User]
 *         responses:
 *           '200':
 *                  description: A successful response
 *           content:
 *              application/json:
 *               schema:
 *                type: array
 */


router.get('/wishlist', (req, res) => {
    res.send(apartments);
})


module.exports = router;