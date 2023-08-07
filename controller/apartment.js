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

    // advance search with filters
    advanceSearch = async (req, res) => {
        console.log('ApartmentController::advanceSearch');

        console.log(req.query)

        // js object
        const params = {
            apartmentTypes: req.query.apartmentTypes.map(type => {
                if (type === 'Family') return 1;
                if (type === 'Bachelor') return 2;
                if (type === 'Sublet') return 3;
                return 0;
            }),
            beds: req.query.beds.map(bed => parseInt(bed)), // 6+ 
            baths: req.query.baths.map(bath => parseInt(bath)), // 5+
            price_min: parseInt(req.query.price_min),
            price_max: parseInt(req.query.price_max),
            area_min: parseInt(req.query.area_min),
            area_max: parseInt(req.query.area_max),
            facilities: req.query.facilities === undefined ? [] : req.query.facilities,
            keywords: req.query.keywords === undefined ? [] : req.query.keywords
        }

        // Check if the beds array contains the number 6
        if (params.beds.includes(6)) {
            // Append numbers 7 to 20 to the beds array
            for (let i = 7; i <= 20; i++) {
                params.beds.push(i);
            }
        }

        // Check if the baths array contains the number 5
        if (params.baths.includes(5)) {
            // Append numbers 6 to 20 to the baths array
            for (let i = 6; i <= 20; i++) {
                params.baths.push(i);
            }
        }

        const data = await repo.advanceSearch(params);
        res.json(data);
    }

}

module.exports = ApartmentController;