const ExploreRepository = require("../repository/explore");
const repo = new ExploreRepository();

class ExploreController {
    fetchApartments = async (req, res) => {
        console.log("ExploreController::fetchApartments");
        const data = await repo.fetchApartments();
        res.json(data);
    }
}

module.exports = ExploreController;