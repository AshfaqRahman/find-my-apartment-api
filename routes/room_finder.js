const express = require('express');
const router = express.Router();
const savedSearches = require('../db/room_find_search')
const posts = require('../db/post')

/**
 * @swagger
 * tags:
 *      name: Room Finder
 *      description: Room Finder
    */

/**
 * @swagger
 * /room_finder/search:
 *   get:
 *     summary: Request for search
 *     tags: [Room Finder]
 *     description: Retrieve posts based on specified search filters
 *     parameters:
 *       - name: location
 *         in: query
 *         description: Location
 *         schema:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *             address:
 *               type: string
 *       - name: max_budget
 *         in: query
 *         description: Maximum budget
 *         schema:
 *           type: integer
 *       - name: min_budget
 *         in: query
 *         description: Minimum budget
 *         schema:
 *           type: integer
 *       - name: gender
 *         in: query
 *         description: Gender
 *         schema:
 *           type: string
 *       - name: person_in_room
 *         in: query
 *         description: Person in room
 *         schema:
 *           type: integer
 *       - name: washroom
 *         in: query
 *         description: Washroom
 *         schema:
 *           type: integer
 *       - name: no_of_residents
 *         in: query
 *         description: Number of residents
 *         schema:
 *           type: integer
 *       - name: no_of_living_rooms
 *         in: query
 *         description: Number of living rooms
 *         schema:
 *           type: integer
 *       - name: facilities
 *         in: query
 *         description: Facilities
 *         schema:
 *          type: array
 *       - name: advantages
 *         in: query
 *         description: Advantages
 *         schema:
 *           type: array
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
*/

router.get('/search', (req, res) => {
    let location = req.query.location;
    let max_budget = req.query.max_budget;
    let min_budget = req.query.min_budget;
    let gender = req.query.gender;
    let person_in_room = req.query.person_in_room;
    let washroom = req.query.washroom;
    let no_of_residents = req.query.no_of_residents;
    let no_of_living_rooms = req.query.no_of_living_rooms;
    let facilities = req.query.facilities;
    let advantages = req.query.advantages;
    res.send(posts).status(200);

})


/**
 * @swagger
 * /room_finder/contact/{post_id}:
 *   get:
 *     summary: Contact the owner of a room
 *     tags: [Room Finder]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the post to contact the owner
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */



router.get('/contact/:post_id', (req, res) => {
    let post_id = req.params.post_id;
    res.send({
        "user_id": 1,
        "name": "John doe",
    }).status(200);
})


/**
 * @swagger
 * /room_finder/save-search:
 *  post:
 *     summary:
 *     tags: [Room Finder]
 *     description:
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                      type: object
 *                 example:
 *                      search_id: "unique id"
 *                      location: {
 *                         latitude: 23.8103,
 *                         longitude: 90.4125,
 *                         address: "Dhaka"
 *                      }    
 *                      max_budget: 20000
 *                      min_budget: 10000
 *                      gender: Male
 *                      person_in_room: 1
 *                      washroom: 2
 *                      no_of_residents: 1
 *                      no_of_living_rooms: 1
 *                      facilities: ["wifi", "parking"]
 *                      advantages: ["near to university", "near to market"]
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

router.post('/save-search', (req, res) => {
    let search_id = req.body.search_id;
    let location = req.body.location;
    let max_budget = req.body.max_budget;
    let min_budget = req.body.min_budget;
    let gender = req.body.gender;
    let person_in_room = req.body.person_in_room;
    let washroom = req.body.washroom;
    let no_of_residents = req.body.no_of_residents;
    let no_of_living_rooms = req.body.no_of_living_rooms;
    let facilities = req.body.facilities;
    let advantages = req.body.advantages;
    res.send({
        "message" : `Search id ${search_id} saved successfully`
    }).status(200);
})


/**
 * @swagger
 * /room_finder/saved-searches/all:
 *  get:
 *     summary:
 *     tags: [Room Finder]
 *     description:
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 */

router.get('/saved-searches/all', (req, res) => {
    res.send(saveSearches).status(200);
})
/**
 * @swagger
 * /room_finder/saved-searches/{search_id}:
 *   get:
 *     summary: Get saved searches by search ID
 *     tags: [Room Finder]
 *     parameters:
 *       - name: search_id
 *         in: path
 *         description: Search ID
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

router.get('/saved-searches/:search_id', (req, res) => {
    const searchId = req.params.search_id;
    // Implement the logic to retrieve saved searches based on the searchId
    res.send(savedSearches[0]).status(200);
});


module.exports = router;