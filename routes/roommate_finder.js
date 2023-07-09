const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *      name: Roommate Finder
 *      description: Roommate Finder
 */

/**
 * @swagger
 * /roommate_finder/post:
 *   post:
 *     summary: Request for post
 *     tags: [Roommate Finder]
 *     description: Post a new roommate finder post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             location: "BUET"
 *             washroom: 1
 *             persons_in_room: 3
 *             gender: "Male"
 *             min_budget: 3
 *             max_budget: 3000
 *             no_of_residents: 3
 *             no_of_living_rooms: 1
 *             facilities: ["wifi", "parking"]
 *             advantages: ["near to university", "near to market"]
 *             description: "This is a good apartment"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


router.post('/post', (req, res) => {
    let location = req.body.location;
    let washroom = req.body.washroom;
    let persons_in_room = req.body.persons_in_room;
    let gender = req.body.gender;
    let min_budget = req.body.min_budget;
    let max_budget = req.body.max_budget;
    let no_of_residents = req.body.no_of_residents;
    let no_of_living_rooms = req.body.no_of_living_rooms;
    let facilities = req.body.facilities;
    let advantages = req.body.advantages;
    let description = req.body.description;
    res.send({
        message: "Post successful"
    }).status(200);
})


module.exports = router;