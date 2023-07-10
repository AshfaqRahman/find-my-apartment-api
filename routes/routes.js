const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const apartmentRouter = require('./apartment');
const userRouter = require('./user');
const roomFinderRouter = require('./room_finder');
const roommateFinderRouter = require('./roommate_finder');
const messageRouter = require('./message');
const recomendationRouter = require('./recomendation');


router.use('/auth', authRouter);
router.use('/apartments', apartmentRouter);
router.use('/user', userRouter);
router.use('/room_finder', roomFinderRouter);
router.use('/roommate_finder', roommateFinderRouter);
router.use('/message', messageRouter);
router.use('/recomendation', recomendationRouter);

module.exports = router;

