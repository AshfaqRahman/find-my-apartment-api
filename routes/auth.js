const express = require('express');
const router = express.Router();



/** 
    * @swagger
    * /auth/register:
    *      post:
    *           summary: Use to request all customers
    *           requestBody:
    *              required: true
    *              content:
    *                 application/json:
    *                    schema:
    *                      type: object
    *                    example:
    *                     username: "John Doe"
    *                     password: "secretpassword"
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
    console.log(req.body)
    let params = req.body;
    let username = params.username;
    let password = req.body.password;
    console.log(username);
    console.log(password);
    let id = 1;
    res.send({
        id: id,
        username: username,
    })
      
})



module.exports = router;