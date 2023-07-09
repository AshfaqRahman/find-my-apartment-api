const express = require('express');
const router = express.Router();

// create swagger authentication tag
/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: User authentication
 */


/** 
    * @swagger
    * /auth/register:
    *      post:
    *           summary: Request for register
    *           tags: [Authentication]
    *           requestBody:
    *              required: true
    *              content:
    *                 application/json:
    *                    schema:
    *                      type: object
    *                    example:
    *                     username: "John Doe"
    *                     password: "secretpassword"
    *                     email: "xyz@abc.p"
    *                     phone: "1234567890"
    * 
    *           responses:
    *               '201':
    *                   description: A successful response
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: object
    *                                  
    *
*/
router.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    
    let id = 1;
    res.send({
        id: id,
        username: username,
    })
      
})

/**
 * @swagger
 * /auth/login:
 *     post:
 *         summary: Request for login
 *         tags: [Authentication]
 *         requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                  schema:
 *                     type: object
 *                  example:
 *                    email: "xyz@abc.p"
 *                    password: "secretpassword"
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
 */

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let token = "token";
    return res.send({
        token: token,
    });
})


/**
 * @swagger
 * /auth/logout:
 *     post:
 *         summary: Request for logout
 *         tags: [Authentication]
 *         responses:
 *           '200':
 *                  description: A successful response
 *           content:
 *              application/json:
 *               schema:
 *                type: object
 * 
 * 
 */

router.post('/logout', (req, res) => {
    return res.send({
        message: "successfully logged out",
    });
})


module.exports = router;