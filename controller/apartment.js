const ApartmentRepository = require('../repository/apartment');
const repo = new ApartmentRepository();

class ApartmentController {
    fetchAllApartments = async (req, res) => {
        console.log('ApartmentController::fetchAllApartments');
        const data = await repo.fetchAllApartments();
        res.json(data);
    }
}

module.exports = ApartmentController;