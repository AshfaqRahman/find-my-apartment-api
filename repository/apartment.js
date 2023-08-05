const { getConnection } = require('../config/database');
// import supabase
const supabase = require('../config/supabase');

class ApartmentRepository{
    fetchAllApartments = async () => {
        console.log('ApartmentRepository::fetchAllApartments')
        const db = await getConnection();
        const data = await db.query(`select * from "Apartment"`);
        db.release();
        return data.rows;
    }

    // find apartment by id
    // use supabase sdk
    findApartmentById = async (id) => {
        console.log(`ApartmentRepository::findApartmentById {id: ${id}}`)
        const { data, error } = await supabase
            .from('Apartment')
            .select('*')
            .eq('apartment_id', id)
            .single()
        if (error) {
            console.log(error)
            return null
        }
        return data
    }
}

// export 
module.exports = ApartmentRepository;