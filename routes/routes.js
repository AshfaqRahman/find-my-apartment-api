const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const apartmentRouter = require('./apartment');
const userRouter = require('./user');
const roomFinderRouter = require('./room_finder');
const roommateFinderRouter = require('./roommate_finder');
const messageRouter = require('./message');
const recomendationRouter = require('./recomendation');
const fixedValuesRouter = require('./fixed-values');
// wishlist
const wishlistRouter = require('./wishlist');
// recommendation
const recommendationRouter = require('./recomendation');
const postRouter = require('./post')
const exploreRouter = require('./explore');
const zonecardRouter = require('./zonecard');


router.use('/auth', authRouter);
router.use('/apartments', apartmentRouter);
router.use('/user', userRouter);
router.use('/room_finder', roomFinderRouter);
router.use('/roommate_finder', roommateFinderRouter);
router.use('/message', messageRouter);
router.use('/recomendation', recomendationRouter);
router.use('/fixed-values', fixedValuesRouter);
// wishlist
router.use('/wishlist', wishlistRouter);
// recommendation
router.use('/recommendation', recommendationRouter);
// post
router.use('/post', postRouter);
router.use('/explore', exploreRouter)
router.use("/message", messageRouter)
// zonecard
router.use("/zonecard" , zonecardRouter);

module.exports = router;

