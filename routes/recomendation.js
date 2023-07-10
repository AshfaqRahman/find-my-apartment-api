const express = require('express');
const router = express.Router();
const apartments = require("../db/apartment");

/**
 * @swagger
 * tags:
 *  name: Recomendation
 *  description: recomendation endpoints
 */


/**
 * @swagger
 * /recomendation:
 *     get:
 *         summary: Request for add apartment to wishlist
 *         tags: [Recomendation]
 *         parameters:
 *           - in: query
 *             name: criteria
 *             schema:
 *               type: object
 *               default: {
 *                 recent_search: true,
 *                 wishlist: true,
 *                 preference: true,
 *                 recently_viewed: false,
 *               }
 *             required: true
 *             description: recomendation based on criteria
 *           - in: query
 *             name: page
 *             schema:
 *               type: integer
 *               default: 1
 *             description: page number
 *           - in: query
 *             name: limit
 *             schema:
 *               type: integer
 *               default: 10
 *             description: page limit
 *         responses:
 *           '200':
 *                  description: A successful response
 *           content:
 *              application/json:
 *               schema:
 *                type: array
 */


router.get('/', (req, res) => {
    const criteria = req.query.criteria;
    res.send(apartments);
})


module.exports = router;