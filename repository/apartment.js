const { getConnection } = require('../config/database');

class ApartmentRepository{
    fetchAllApartments = async () => {
        console.log('ApartmentRepository::fetchAllApartments')
        const db = await getConnection();
        const data = await db.query(`select * from "Apartment"`);
        db.release();
        return data.rows;
    }
}

// export 
module.exports = ApartmentRepository;