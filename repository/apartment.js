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

    // advance search with filters
    advanceSearch = async (params) => {
        try {
            const { 
                apartmentTypes, // e.g. ["Family", "Bachelor"]
                beds,  // e.g. ['1', '2', '3']
                baths, 
                price_min, price_max, area_min, area_max, facilities, keywords } = params;

            console.log(params)
            const { data, error } = await supabase
                .from('Apartment')
                .select('*')
                .in('type', apartmentTypes)
                .in('bedrooms', beds)
                .in('washrooms', baths)
                .gte('price', price_min)
                .lte('price', price_max)
                .gte('area_sqft', area_min)
                .lte('area_sqft', area_max)
                .contains('facilities', facilities)
                .contains('star_points', keywords);
        
            if (error) {
                throw error;
            }
            
            console.log("data")
            console.log(data)
        
            return data;
            } catch (error) {
            console.error('Error performing advanced search:', error.message);
            return null;
            }
    }
}

// export 
module.exports = ApartmentRepository;