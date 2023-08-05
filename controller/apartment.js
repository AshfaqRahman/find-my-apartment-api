const ApartmentRepository = require('../repository/apartment');
const repo = new ApartmentRepository();

class ApartmentController {
    fetchAllApartments = async (req, res) => {
        console.log('ApartmentController::fetchAllApartments');
        const data = await repo.fetchAllApartments();
        res.json(data);
    }

    // find apartment by id
    findApartmentById = async (req, res) => {
        console.log('ApartmentController::findApartmentById');
        const { id } = req.params;
        const data = await repo.findApartmentById(id);
        res.json(data);
    }
    
}

module.exports = ApartmentController;