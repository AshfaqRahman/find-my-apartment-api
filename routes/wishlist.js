const express = require("express")
const router = express.Router()
const apartments = require("../db/apartment");
const WishlistController = require("../controller/wishlist");
const controller = new WishlistController();
const { authenticateToken } = require("../config/authorization.js");

/**
 * @swagger
 * tags:
 *  name: Wishlist
 *  description: user wishlist endpoints
 */

/**
 * @swagger
 * /api/wishlist:
 *     get:
 *         summary: Request for get wishlist
 *         tags: [Wishlist]
 *         responses:
 *           '200':
 *                  description: A successful response
 *           content:
 *              application/json:
 *               schema:
 *                type: array
 */


router.get('/', authenticateToken, controller.getWishlist)

/**
 * @swagger
 * /api/wishlist/add:
 *     post:
 *         summary: Request for add apartment to wishlist
 *         tags: [Wishlist]
 *         requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  example:
 *                      apartment_id: "b9741c46-c7bd-4fa5-a323-8cc2dba15e10"
 *         responses:
 *           '200':
 *                  description: A successful response
 *           content:
 *              application/json:
 *               schema:
 *                type: object
 */


router.post('/add', authenticateToken, controller.addToWishlist)

/**
 * @swagger
 * /api/wishlist/{apartment_id}:
 *     delete:
 *       summary: Request for add apartment to wishlist
 *       tags: [Wishlist]
 *       parameters:
 *        - in: path
 *          name: apartment_id
 *          required: true
 *          schema:
 *           type: string
 *       responses:
 *         '200':
 *               description: A successful response
 *         content:
 *            application/json:
 *             schema:
 *              type: object
 */

router.delete('/:apartment_id', authenticateToken, controller.removeFromWishlist)


module.exports = router;