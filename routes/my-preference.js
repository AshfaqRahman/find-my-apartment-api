const express = require("express");
const { route } = require("./auth");
const router = express.Router();
const { authenticateToken } = require("../config/authorization.js");
const UserController = require('../controller/user');
const controller = new UserController();

/**
 * @swagger
 * tags:
 *     name: My Preference
 *     description: My Preference
 */

/**
 * @swagger
 * /user/my-preference:
 *   post:
 *     summary: save your preference
 *     tags: [My Preference]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               type: family
 *               location: [{
 *                 address: 12/1, Mirpur Road,
 *                 latitude: 23.123456,
 *                 longitude: 90.123456
 *               }]
 *               bedroom: 2
 *               washroom: 2
 *               price_min: 10000
 *               price_max: 20000
 *               area_min: 1000
 *               area_max: 2000
 *               facilities: ["wifi", "parking"]
 *               star_points: ["nearby_school", "nearby_hospital"]
 *               workplace: {
 *                 address: 12/1, Mirpur Road,
 *                 latitude: 23.123456,
 *                 longitude: 90.123456
 *               }
 *     responses:
 *       '200':
 *         description: Successful response with matching apartments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

router.post("/", authenticateToken, controller.setPreference);
router.get("/", authenticateToken, controller.getPreference);

/**
 * @swagger
 * /user/my-preference:
 *   get:
 *     summary: save your preference
 *     tags: [My Preference]
 *     responses:
 *       '200':
 *         description: Successful response with matching apartments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

router.get("/", (req, res) => {
  let ret_obj = {
    type: "family",
    location: [
      {
        address: "12/1, Mirpur Road",
        latitude: 23.123456,
        longitude: 90.123456,
      },
    ],
    bedroom: 2,
    washroom: 2,
    price_min: 10000,
    price_max: 20000,
    area_min: 1000,
    area_max: 2000,
    facilities: ["wifi", "parking"],
    star_points: ["nearby_school", "nearby_hospital"],
    workplace: {
      address: "12/1, Mirpur Road",
      latitude: 23.123456,
      longitude: 90.123456,
    },
  };
//   console.log(ret_obj);
  res
    .send(ret_obj)
    .status(200);
});

module.exports = router;
