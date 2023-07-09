const express = require('express');
const router = express.Router();

// create swagger apartmet schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Apartment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Apartment ID
 *         type:
 *           type: string
 *           description: Apartment type
 *         price:
 *           type: number
 *           description: Rental price
 *         area_sqft:
 *           type: integer
 *           description: Area in square feet
 *         zone:
 *           type: string
 *           description: Zone
 *         area:
 *           type: string
 *           description: Area
 *         beds:
 *           type: integer
 *           description: Number of beds
 *         baths:
 *           type: integer
 *           description: Number of baths
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image links
 *         location:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: Latitude coordinate of the apartment location
 *             longitude:
 *               type: number
 *               description: Longitude coordinate of the apartment location
 *             division:
 *               type: string
 *               description: Division name
 *             district:
 *               type: string
 *               description: District name
 *             street:
 *               type: string
 *               description: Street name
 *             house_number:
 *               type: string
 *               description: House number
 *         owner_user_id:
 *           type: integer
 *           description: ID of the apartment owner user
 *         facilities:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of facilities available in the apartment
 */




// create swagger tag
/**
 * @swagger
 * tags:
 *  name: Apartments
 *  description: Apartment management
 */



/** 
    * @swagger
    * /apartments:
    *      get:
    *           summary: Request for apartments
    *           tags: [Apartments]
    *           responses:
    *               '200':
    *                   description: OK
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: object
    *                                  
    *
*/

router.get('/', (req, res) => {
    res.send(["Apartments"]);
})

router.get('/:id', (req, res) => {
    res.send([
        `Apartment no.: ${req.params.id}`]
    ).status(200);
})

/** 
    * @swagger
    * /apartments:
    *      post:
    *           summary: apartments post
    *           tags: [Apartments]
    *           requestBody:
    *               required: true
    *               content:
    *                   application/json:
    *                       schema:
    *                           type: object
    *                       example:
    *                           id: "408"
    *                           address: "BUET"
    *                           price: "20000"
    *           responses:
    *               '200':
    *                   description: OK
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: object
    *                                  
    *
*/

router.post('/', (req, res) => {
    res.send({
        "Apartment no.": req.body.id, 
        Address: req.body.address, 
        Price: req.body.price}
    ).status(200);
})


/**
 * @swagger
 * /apartments/search:
 *   get:
 *     summary: Search for apartments
 *     tags: [Apartments]
 *     description: Retrieve apartments based on specified search filters
 *     parameters:
 *       - name: type
 *         in: query
 *         description: Apartment type (e.g., family, bachelor, sublet)
 *         schema:
 *           type: string
 *       - name: price_min
 *         in: query
 *         description: Minimum price range in BDT
 *         schema:
 *           type: integer
 *       - name: price_max
 *         in: query
 *         description: Maximum price range in BDT
 *         schema:
 *           type: integer
 *       - name: beds
 *         in: query
 *         description: Number of beds
 *         schema:
 *           type: integer
 *       - name: baths
 *         in: query
 *         description: Number of baths
 *         schema:
 *           type: integer
 *       - name: area_min
 *         in: query
 *         description: Minimum area in square feet
 *         schema:
 *           type: integer
 *       - name: area_max
 *         in: query
 *         description: Maximum area in square feet
 *         schema:
 *           type: integer
 *       - name: area
 *         in: query
 *         description: Specific area
 *         schema:
 *           type: string
 *       - name: zone
 *         in: query
 *         description: Specific zone
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with matching apartments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apartment'
 *       '400':
 *         description: Bad request. Invalid search parameters provided.
 *       '500':
 *         description: Internal server error. An error occurred while processing the request.
 */

router.get("/apartments", (req, res) => {
    // get query parameters
    let type = req.query.type;
    let price_min = req.query.price_min;
    let price_max = req.query.price_max;
    let beds = req.query.beds;
    let baths = req.query.baths;
    let area_min = req.query.area_min;
    let area_max = req.query.area_max;
    let area = req.query.area;
    let zone = req.query.zone;


    res.send({
        type: type,
        price_min: price_min,
        price_max: price_max,
        beds: beds,
        baths: baths,
        area_min: area_min,
        area_max: area_max,
        area: area,
        zone: zone
    }).status(200);
})


module.exports = router;