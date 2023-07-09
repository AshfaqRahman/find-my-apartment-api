const express = require('express');
const router = express.Router();
const apartments = require("../db/apartment");
const savedSearches = require("../db/apartment-search");

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
 *         bedrooms:
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
 *         star_points:
 *           type: array
 *           items:
 *             type: string
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
    * /apartments/all:
    *      get:
    *           summary: Request for apartments
    *           tags: [Apartments]
    *           description: Retrieve all apartments
    *
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

router.get('/all', (req, res) => {
    res.send(apartments);
})

/** 
    * @swagger
    * /apartments:
    *      get:
    *           summary: Request for apartments
    *           tags: [Apartments]
    *           description: Retrieve an apartment
    *           parameters:
    *               - name: id
    *                 in: query
    *                 description: Apartment ID
    *                 schema:
    *                   type: integer
    *
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
    res.send(
        apartments[0]
    ).status(200);
})

/** 
    * @swagger
    * /apartments/add:
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
    *                           type: "family"
    *                           images: ["image1", "image2"]
    *                           blueprints: ["blueprint1", "blueprint2"]
    *                           floor: "1000"
    *                           area_sqft: 234
    *                           bedroom: 3
    *                           washroom: 2
    *                           rent: 10000
    *                           location: {
    *                              division: "Dhaka",
    *                              district: "Dhaka",
    *                              street: "Dhaka",
    *                              house_number: "Dhaka",
    *                              latitude: 23.8103,
    *                              longitude: 90.4125
    *                           }
    *                           zone: "Dhaka"
    *                           area: "Dhaka"
    *                           owner_user_id: 1
    *                           facilities: ["facility1", "facility2"]
    *                           description: "description"
    *                           email: "email"
    *                           phone: "phone"
    *                           star_points: ["star_point1", "star_point2"]
    *
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

router.post('/add', (req, res) => {
    let apartment = {
        "type": req.body.type,
        "images": req.body.images,
        "blueprints": req.body.blueprints,
        "floor": req.body.floor,
        "area_sqft": req.body.area_sqft,
        "bedroom": req.body.bedroom,
        "washroom": req.body.washroom,
        "rent": req.body.rent,
        "location": req.body.location,
        "zone": req.body.zone,
        "area": req.body.area,
        "owner_user_id": req.body.owner_user_id,
        "facilities": req.body.facilities,
        "description": req.body.description,
        "email": req.body.email,
        "phone": req.body.phone,
        "star_points": req.body.star_points
    }
    res.send({
        message: "Apartment added successfully",
    }).status(200);
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

router.get("/search", (req, res) => {
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


    res.send(
        apartments
    ).status(200);
})

/**
 * @swagger
 * /apartments/advance-search:
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
 *       - name: bedroom
 *         in: query
 *         description: Number of bedrooms
 *         schema:
 *           type: integer
 *       - name: washroom
 *         in: query
 *         description: Number of washrooms
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
 *       - name: facilities
 *         in: query
 *         description: List of facilities
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - name: star_points
 *         in: query
 *         description: List of star_points
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *
 *     responses:
 *       '200':
 *         description: Successful response with matching apartments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apartment'
 */


router.get("/advance-search", (req, res) => {
    let req_obj = {
        "type": req.query.type,
        "price_min": req.query.price_min,
        "price_max": req.query.price_max,
        "bedroom": req.query.bedroom,
        "washroom": req.query.washroom, 
        "area_min": req.query.area_min,
        "area_max": req.query.area_max,
        "area": req.query.area,
        "zone": req.query.zone,
        "facilities": req.query.facilities,
        "star_points": req.query.star_points,
    }
    res.send(apartments).status(200);
})


/**
 * @swagger
 * /apartments/save-search:
 *   post:
 *     summary: Search for apartments
 *     tags: [Apartments]
 *     description: Retrieve apartments based on specified search filters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               search_id: unique_id
 *               type: family
 *               price_min: 10000
 *               price_max: 20000
 *               bedroom: 2
 *               washroom: 2
 *               area_min: 1000
 *               area_max: 2000
 *               area: Mirpur
 *               zone: Dhaka
 *               facilities: ["wifi", "parking"]
 *               star_points: ["nearby_school", "nearby_hospital"]
 *     responses:
 *       '200':
 *         description: Successful response with matching apartments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

router.post("/save-search", (req, res) => {
    let req_obj = {
        "search_id": req.body.search_id,
        "type": req.body.type,
        "price_min": req.body.price_min,
        "price_max": req.body.price_max,
        "bedroom": req.body.bedroom,
        "washroom": req.body.washroom,
        "area_min": req.body.area_min,
        "area_max": req.body.area_max,
        "area": req.body.area,
        "zone": req.body.zone,
        "facilities": req.body.facilities,
        "star_points": req.body.star_points,
    }
    res.send({
        "message" : `Search id ${req_obj.search_id} saved successfully`
    }).status(200);
})

/**
 * @swagger
 * /apartments/saved-searches/all:
 *   get:
 *     summary: Search for apartments
 *     tags: [Apartments]
 *     description: Retrieve apartments based on specified search filters
 *     responses:
 *       '200':
 *         description: Successful response with matching apartments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
 

router.get("/saved-searches/all", (req, res) => {
    res.send(savedSearches).status(200);
})

/**
 * @swagger
 * /apartments/saved-searches:
 *   get:
 *     summary: Search for apartments
 *     tags: [Apartments]
 *     description: Retrieve apartments based on specified search filters
 *     parameters:
 *       - name: search_id
 *         in: query
 *         description: Search id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with matching apartments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
 

router.get("/saved-searches", (req, res) => {
    res.send(savedSearches[0]).status(200);
})


module.exports = router;