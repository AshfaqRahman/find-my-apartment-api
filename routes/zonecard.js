const express=require('express')
const router = express.Router();
const ZonecardController = require("../controller/zonecard")


const controller = new ZonecardController();

router.get("/", controller.fetchZonecardData)

module.exports = router;