const express = require('express');
const router = express.Router();
const apartments = require("../db/apartment");
const savedSearches = require("../db/apartment-search");
const ApartmentController = require('../controller/apartment');
const { authenticateToken } = require("../config/authorization.js");


const controller = new ApartmentController();

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
    * /api/apartments/all:
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

router.get('/all', controller.fetchAllApartments);

/**
* @swagger
* /api/apartments/{apartmentId}:
*   get:
*     summary: Request for an apartment
*     tags: [Apartments]
*     description: Retrieve an apartment by ID
*     parameters:
*       - name: apartmentId
*         in: path
*         description: Apartment ID
*         required: true
*         schema:
*           type: integer
*     responses:
*       '200':
*         description: OK
*         content:
*           application/json:
*             schema:
*               type: object
*       '404':
*         description: Apartment not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*/

router.get('/:id', controller.findApartmentById)

/** 
    * @swagger
    * /api/apartments/add:
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
    *                           floor: "2"
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
    *                           facilities: ["facility1", "facility2"]
    *                           description: "description"
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
        "facilities": req.body.facilities,
        "description": req.body.description,
        "star_points": req.body.star_points
    }
    res.send({
        message: "Apartment added successfully",
    }).status(200);
})


/**
 * @swagger
 * /api/apartments/search:
 *   get:
 *     summary: Search for apartments
 *     tags: [Apartments]
 *     description: Retrieve apartments based on specified search filters
 *     parameters:
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

// /**
//  * @swagger
//  * /api/apartments/advance-search:
//  *   get:
//  *     summary: Search for apartments
//  *     tags: [Apartments]
//  *     description: Retrieve apartments based on specified search filters
//  *     parameters:
//  *       - name: type
//  *         in: query
//  *         description: Apartment type (e.g., family, bachelor, sublet)
//  *         schema:
//  *           type: string
//  *       - name: price_min
//  *         in: query
//  *         description: Minimum price range in BDT
//  *         schema:
//  *           type: integer
//  *       - name: price_max
//  *         in: query
//  *         description: Maximum price range in BDT
//  *         schema:
//  *           type: integer
//  *       - name: bedroom
//  *         in: query
//  *         description: Number of bedrooms
//  *         schema:
//  *           type: integer
//  *       - name: washroom
//  *         in: query
//  *         description: Number of washrooms
//  *         schema:
//  *           type: integer
//  *       - name: area_min
//  *         in: query
//  *         description: Minimum area in square feet
//  *         schema:
//  *           type: integer
//  *       - name: area_max
//  *         in: query
//  *         description: Maximum area in square feet
//  *         schema:
//  *           type: integer
//  *       - name: area
//  *         in: query
//  *         description: Specific area
//  *         schema:
//  *           type: string
//  *       - name: zone
//  *         in: query
//  *         description: Specific zone
//  *         schema:
//  *           type: string
//  *       - name: facilities
//  *         in: query
//  *         description: List of facilities
//  *         schema:
//  *           type: array
//  *           items:
//  *             type: string
//  *       - name: star_points
//  *         in: query
//  *         description: List of star_points
//  *         schema:
//  *           type: array
//  *           items:
//  *             type: string
//  *
//  *     responses:
//  *       '200':
//  *         description: Successful response with matching apartments
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Apartment'
//  */

/**
 * @swagger
 * /api/apartments/:
 *   get:
 *     summary: Advanced apartment search
 *     description: Retrieve a list of apartments based on advanced search criteria.
 *     tags: [Apartments]
 *     parameters:
 *       - in: query
 *         name: apartmentTypes
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Apartment types (e.g., Family, Bachelor)
 *       - in: query
 *         name: beds
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Number of beds (e.g., 1, 2)
 *       - in: query
 *         name: baths
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Number of baths (e.g., 2)
 *       - in: query
 *         name: price_min
 *         schema:
 *           type: string
 *         description: Minimum price range
 *       - in: query
 *         name: price_max
 *         schema:
 *           type: string
 *         description: Maximum price range
 *       - in: query
 *         name: area_min
 *         schema:
 *           type: string
 *         description: Minimum area size
 *       - in: query
 *         name: area_max
 *         schema:
 *           type: string
 *         description: Maximum area size
 *       - in: query
 *         name: facilities
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Facilities (e.g., Gas, Internet)
 *       - in: query
 *         name: keywords
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Keywords (e.g., Near Park, Near Hospital)
 *     responses:
 *       200:
 *         description: Successful response with apartment search results.
 *         content:
 *           application/json:
 *             example:
 *               searchResults: []
 */
router.get("/", authenticateToken, controller.advanceSearch)


/**
 * @swagger
 * /api/apartments/save-search:
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
 * /api/apartments/saved-searches/all:
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
* /api/apartments/saved-searches/{search_id}:
*   get:
*     summary: Search for apartments
*     tags: [Apartments]
*     description: Retrieve apartments based on specified search filters
*     parameters:
*       - name: search_id
*         in: path
*         description: Search ID
*         schema:
*           type: string
*         required: true
*     responses:
*       '200':
*         description: Successful response with matching apartments
*         content:
*           application/json:
*             schema:
*               type: array
*/


router.get("/saved-searches/:search_id", (req, res) => {
   const searchId = req.params.search_id;
   // Implement the logic to retrieve apartments based on the searchId
   res.send(savedSearches[0]).status(200);
});


/**
 * @swagger
 * /api/apartments:
 *     patch:
 *         summary: Request for update apartment
 *         tags: [Apartments]
 *         requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                  schema:
 *                     type: object
 *                  example:
 *                     apartment_id: 1
 *                     type: "family"
 *                     images: ["image1", "image2"]
 *                     blueprints: ["blueprint1", "blueprint2"]
 *                     floor: 2
 *                     area_sqft: 234
 *                     rent: 10000
 *                     bedroom: 2
 *                     washroom: 2
 *                     area: "Mirpur"
 *                     zone: "Dhaka"
 *                     location: {
 *                        division: "Dhaka",
 *                        district: "Dhaka",
 *                        street: "Dhaka",
 *                        house_number: "Dhaka",
 *                        latitude: 23.8103,
 *                        longitude: 90.4125  *                     }
 *                     facilities: ["wifi", "parking"]
 *                     star_points: ["nearby_school", "nearby_hospital"]
 *

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
 * 
 */

router.patch('/', (req, res) => {
    return res.send(
        apartments[0]
    );
})


/**
 * @swagger
 * /api/apartments/{apartmentId}:
 *   delete:
 *     summary: Request to delete an apartment
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: apartmentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Apartment ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.delete('/:apartmentId', (req, res) => {
    const apartmentId = req.params.apartmentId;
    // Perform the deletion logic for the apartment with the provided apartmentId
    
    res.status(200).json({
        message: "Successfully removed the apartment"
    });
});

module.exports = router;