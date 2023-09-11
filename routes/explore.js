const express=require('express')
const router = express.Router();
const ExploreController = require("../controller/explore")
const { authenticateToken } = require("../config/authorization.js");


const controller = new ExploreController();

router.get('/', controller.fetchApartments);

module.exports = router;