const ZonecardRepository = require("../repository/zonecard");
const repo = new ZonecardRepository();

class ZonecardController {
    fetchZonecardData = async (req, res) => {
        console.log("ZonecardController::fetchZonecardData");
        const data = await repo.fetchZonecardData();
        res.json(data);
    }
}

module.exports = ZonecardController;