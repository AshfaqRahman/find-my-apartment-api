const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const apartmentRouter = require('./apartment');


router.use('/auth', authRouter);
router.use('/apartments', apartmentRouter);

module.exports = router;