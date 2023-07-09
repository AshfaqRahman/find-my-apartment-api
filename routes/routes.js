const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const apartmentRouter = require('./apartment');
const userRouter = require('./user');


router.use('/auth', authRouter);
router.use('/apartments', apartmentRouter);
router.use('/user', userRouter);

module.exports = router;