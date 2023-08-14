const express = require('express');
const router = express.Router();

// import user controller
const AuthController = require('../controller/auth');
const authController = new AuthController();

const { authenticateToken } = require("../config/authorization.js");

// create swagger authentication tag
/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: User authentication
 */


// Route for user registration
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone_no:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request - Invalid input data
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
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

router.post('/login', authController.login)


/**
 * @swagger
 * /api/auth/logout:
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


router.post('/is-token-valid', authenticateToken, authController.isLoggedIn)


module.exports = router;