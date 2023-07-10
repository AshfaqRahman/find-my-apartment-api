const express = require('express');
const router = express.Router();
const apartments = require("../db/apartment");

/**
 * @swagger
 * tags:
 *  name: Recommendation
 *  description: Recommendation endpoints
 */

/**
 * @swagger
 * /recommendation:
 *     get:
 *         summary: Request for recommend apartments
 *         tags: [Recommendation]
 *         parameters:
 *           - in: query
 *             name: recent_search
 *             schema:
 *               type: boolean
 *               default: true
 *             required: true
 *             description: Include recent search in recommendation
 *           - in: query
 *             name: wishlist
 *             schema:
 *               type: boolean
 *               default: true
 *             required: true
 *             description: Include wishlist items in recommendation
 *           - in: query
 *             name: preference
 *             schema:
 *               type: boolean
 *               default: true
 *             required: true
 *             description: Include user preferences in recommendation
 *           - in: query
 *             name: recently_viewed
 *             schema:
 *               type: boolean
 *               default: false
 *             required: true
 *             description: Include recently viewed items in recommendation
 *           - in: query
 *             name: page
 *             schema:
 *               type: integer
 *               default: 1
 *             description: Page number
 *           - in: query
 *             name: limit
 *             schema:
 *               type: integer
 *               default: 10
 *             description: Page limit
 *         responses:
 *           '200':
 *                  description: A successful response
 *           content:
 *              application/json:
 *               schema:
 *                type: array
 */

router.get('/', (req, res) => {
    const { recent_search, wishlist, preference, recently_viewed } = req.query;
    // Use the individual criteria parameters in your recommendation logic
    res.send(apartments);
});


module.exports = router;