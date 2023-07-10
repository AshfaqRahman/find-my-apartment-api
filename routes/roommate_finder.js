const express = require('express');
const router = express.Router();
const posts = require('../db/post')

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

/**
 * @swagger
 * /roommate_finder/post/my/all:
 *   get:
 *     summary: Get all posts
 *     tags: [Roommate Finder]
 *     description: Get all posts of mine
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

router.get("/post/my/all", (req, res) => {
    res.send(posts)
})
/**
 * @swagger
 * /roommate_finder/post/my/{post_id}:
 *   get:
 *     summary: Get a post
 *     tags: [Roommate Finder]
 *     description: Get a specific post
 *     parameters:
 *       - name: post_id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

router.get("/post/my/:post_id", (req, res) => {
    const postId = req.params.post_id;
    // Implement the logic to retrieve the post based on the postId
    res.send(posts[0]);
});



/**
 * @swagger
 * /roommate_finder/post:
 *     patch:
 *         summary: Request for update post
 *         tags: [Roommate Finder]
 *         requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                  schema:
 *                     type: object
 *                  example:
 *                     post_id: 1
 *                     location: "BUET"
 *                     washroom: 1
 *                     persons_in_room: 3
 *                     gender: "Male"
 *                     min_budget: 3
 *                     max_budget: 3000
 *                     no_of_residents: 3
 *                     no_of_living_rooms: 1
 *                     facilities: ["wifi", "parking"]
 *                     advantages: ["near to university", "near to market"]
 *                     description: "This is a good apartment"
 * 
 *         responses:
 *           '200':
 *                  description: A successful response
 *           content:
 *              application/json:
 *               schema:
 *                type: object
 */

router.patch('/post', (req, res) => {
    return res.send(
        posts[0]
    );
})


/**
 * @swagger
 * /roommate_finder/post:
 *     delete:
 *         summary: Request for add apartment to wishlist
 *         tags: [Roommate Finder]
 *         parameters:
 *           - in: query
 *             name: post_id
 *             schema:
 *               type: integer
 *             required: true
 *             description: post id
 *         responses:
 *           '200':
 *                  description: A successful response
 *           content:
 *              application/json:
 *               schema:
 *                type: object
 */

router.delete('/post', (req, res) => {
    let postID = req.body.post_id;
    res.send({
        message: "successfully removed your post"
    })
})
module.exports = router;