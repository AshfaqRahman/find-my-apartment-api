const express = require("express")
const router = express.Router()
const apartments = require("../db/apartment");


/**
 * @swagger
 * tags:
 *  name: Wishlist
 *  description: user wishlist endpoints
 */

/**
 * @swagger
 * /user/wishlist:
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


router.get('/', (req, res) => {
    res.send(apartments);
})

/**
 * @swagger
 * /user/wishlist/add:
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
 *                      apartment_id: 1
 *         responses:
 *           '200':
 *                  description: A successful response
 *           content:
 *              application/json:
 *               schema:
 *                type: object
 */


router.post('/add', (req, res) => {
    const apartmentId = req.body.apartment_id;
    res.send({
        message: "Apartment added to wishlist",
        apartments: apartments
    })
})

/**
 * @swagger
 * /user/wishlist:
 *     delete:
 *         summary: Request for add apartment to wishlist
 *         tags: [Wishlist]
 *         parameters:
 *           - in: query
 *             name: apartment_id
 *             schema:
 *               type: integer
 *             required: true
 *             description: apartment id
 *         responses:
 *           '200':
 *                  description: A successful response
 *           content:
 *              application/json:
 *               schema:
 *                type: object
 */

router.delete('/', (req, res) => {
    let apartmentId = req.body.apartment_id;
    res.send({
        message: "successfully removed from wishlist"
    })
})


module.exports = router;