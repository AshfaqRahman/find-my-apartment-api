const express = require('express');
const router = express.Router();
const apartments = require("../db/apartment");
const RecommendationController = require('../controller/recommendation');
const { authenticateToken } = require("../config/authorization.js");


const controller = new RecommendationController();


/**
 * @swagger
 * tags:
 *  name: Recommendation
 *  description: Recommendation endpoints
 */

/**
 * @swagger
 * /api/recommendation:
 *     get:
 *         summary: Request for recommend apartments
 *         tags: [Recommendation]
 *         responses:
 *           '200':
 *                  description: A successful response
 *           content:
 *              application/json:
 *               schema:
 *                type: array
 */

router.get('/', authenticateToken , controller.recommendationByPreference);


module.exports = router;