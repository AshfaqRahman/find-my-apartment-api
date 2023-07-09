const express = require('express');
const router = express.Router();

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
    res.send(
        [
            {
                "id": 1,
                "location": {
                    "latitude": 23.8103,
                    "longitude": 90.4125,
                    "address": "Dhaka"
                },
                "cost": 20000,
                "gender": "Male",
                "person_in_room": 1,
                "washroom": 2,
                "no_of_residents": 1,
                "no_of_living_rooms": 1,
                "facilities": ["wifi", "parking"],
                "advantages": ["near to university", "near to market"],
                description: "This is a good apartment"
            },
            {
                "id": 2,
                "location": {
                    "latitude": 23.8103,
                    "longitude": 90.4125,
                    "address": "Dhaka"
                },
                "cost": 20000,
                "gender": "Male",
                "person_in_room": 1,
                "washroom": 2,
                "no_of_residents": 1,
                "no_of_living_rooms": 1,
                "facilities": ["wifi", "parking"],
                "advantages": ["near to university", "near to market"],
                description: "This is a good apartment"
            },

        ]
    ).status(200);

})


/**
 * @swagger
 * /room_finder/contact:
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
 *                      post_id: 1
 *
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
*/

router.post('/contact', (req, res) => {
    let post_id = req.body.post_id;
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
 * /room_finder/saved-searches:
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

router.get('/saved-searches', (req, res) => {
    res.send([
        {
            "search_id": "unique id",
            "location": {
                "latitude": 23.8103,
                "longitude": 90.4125,
                "address": "Dhaka"
            },
            "max_budget": 20000,
            "min_budget": 10000,
            "gender": "Male",
            "person_in_room": 1,
            "washroom": 2,
            "no_of_residents": 1,
            "no_of_living_rooms": 1,
            "facilities": ["wifi", "parking"],
            "advantages": ["near to university", "near to market"]
        },
        {
            "search_id": "unique id 2",
            "location": {
                "latitude": 23.8103,
                "longitude": 90.4125,
                "address": "Dhaka"
            },
            "max_budget": 20000,
            "min_budget": 10000,
            "gender": "Male",
            "person_in_room": 1,
            "washroom": 2,
            "no_of_residents": 1,
            "no_of_living_rooms": 1,
            "facilities": ["wifi", "parking"],
            "advantages": ["near to university", "near to market"]
        }
    ])
})

module.exports = router;