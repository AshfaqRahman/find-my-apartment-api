const { getConnection } = require("../config/database");
// import supabase
const supabase = require("../config/supabase");

class ApartmentRepository {
  fetchAllApartments = async () => {
    console.log("ApartmentRepository::fetchAllApartments");
    const db = await getConnection();
    const data = await db.query(`select * from "Apartment"`);
    db.release();
    return data.rows;
  };

  // find apartment by id
  // use supabase sdk
  findApartmentById = async (id) => {
    console.log(`ApartmentRepository::findApartmentById {id: ${id}}`);
    const { data, error } = await supabase
      .from("Apartment")
      // location_id is a foreign key
      // https://stackoverflow.com/questions/76107620/supabase-query-go-get-parent-record-with-at-least-one-child-record
      // https://stackoverflow.com/questions/75224153/query-from-multiple-tables-in-supabase
      .select(
        `
            *, 
            location: Location!inner(*),
            facilities: ApFac(facility:Facilities(title)), 
            startpoints: ApStar(starpoint:Starpoints(title))
            `
      ) //
      .eq("apartment_id", id)
      .single();
    if (error) {
      console.log(error);
      return null;
    }

    delete data.location_id;

    return data;
  };

  // advance search with filters
  advanceSearch = async (params) => {
    try {
      const {
        apartmentTypes, // e.g. ["Family", "Bachelor"]
        beds, // e.g. ['1', '2', '3']
        baths,
        price_min,
        price_max,
        area_min,
        area_max,
        facilities,
        keywords,
      } = params;

      // console.log(params)
      const { data, error } = await supabase
        .from("Apartment")
        .select(
          `
                *, 
                location: Location!inner(*),
                facilities: ApartmentFacilities(facility:Facilities(facilities_id, title)), 
                starpoints: ApartmentStarPoints(starpoint:Starpoints(starpoint_id, title))
                `
        )
        .in("type", apartmentTypes)
        .in("bedrooms", beds)
        .in("washrooms", baths)
        .gte("price", price_min)
        .lte("price", price_max)
        .gte("area_sqft", area_min)
        .lte("area_sqft", area_max);
      if (error) {
        // console.log("Error performing advanced search:", error.message)
        throw error;
      }

      // print data length
      console.log(`Advance search: total apartment ${data.length}`);

      return data;
    } catch (error) {
      console.error("Error performing advanced search:", error.message);
      return null;
    }
  };
}

// export
module.exports = ApartmentRepository;
