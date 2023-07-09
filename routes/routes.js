const express = require('express');
const router = express.Router();
const authRouter = require('./auth');



router.use('/auth', authRouter);


router.get('/ap')
module.exports = router;