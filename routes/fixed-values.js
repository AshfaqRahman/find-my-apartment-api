const express = require('express');
const router = express.Router();

const { authenticateToken } = require("../config/authorization.js");
const FixedValuesController = require('../controller/fixed-values');
const controller = new FixedValuesController();

router.get("/facilities", authenticateToken, controller.getFacilities)
router.get("/starpoints", authenticateToken, controller.getStarPoints)

module.exports = router;