const FixedValuesRepository = require("../repository/fixed-values");
const repo = new FixedValuesRepository();

class FixedValuesController {
  getFacilities = async (req, res) => {
    console.log("FixedValuesController::getFacilities");
    let data = await repo.getFacilities();
    data = data.map(datum => datum.title);
    res.json(data);
  }

  getStarPoints = async (req, res) => {
    console.log("FixedValuesController::getStarPoints");
    let data = await repo.getStarPoints();
    data = data.map(datum => datum.title);
    res.json(data);
  }
}

module.exports = FixedValuesController;
