const express=require('express')
const router = express.Router();
const PostController = require("../controller/post")
const { authenticateToken } = require("../config/authorization.js");


const controller = new PostController();

router.post('/', authenticateToken, controller.postSubmit);

module.exports = router;