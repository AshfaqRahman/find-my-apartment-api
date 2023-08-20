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
      // add a field is exist in wishlist
      .select(
        `
            *, 
            location: Location!inner(*),
            images: ApartmentImages!inner(image_url),
            facilities: ApartmentFacilities(facility:Facilities(title)), 
            starpoints: ApartmentStarPoints(starpoint:Starpoints(title))
            `
      ) //
      .eq("id", id)
      .single();
    if (error) {
      console.log(`ApartmentRepository::findApartmentById:: error: ${error}`);
      console.log(error)
      return {
        error: "Apartment not found",
        code: 404,
      }
    }

    delete data.location_id;

    return {data};
  };

  add = async (params) => {
    console.log("ApartmentRepository::add");

    try {

      let locationParams = params.location;
      let location = await supabase
        .from("Location")
        .insert(locationParams)
        .select();
      if(location.error) throw location.error;

      console.log("ApartmentRepository::add:: location inserted successfully");

      let apartmentParams = params.apartment;
      apartmentParams.location_id = location.data[0].id;
      apartmentParams.owner_id = params.user.id;
      let apartmentRow = await supabase
        .from("Apartment")
        .insert(apartmentParams)
        .select();

      console.log("ApartmentRepository::add:: apartment inserted successfully");

      let apartmentFacilitiesParams = params.facilities.facility_ids.map(
        (facility) => {
          return {
            apartment_id: apartmentRow.data[0].id,
            facilities_id: facility,
          };
        }
      );
      let facilities = await supabase
        .from("ApartmentFacilities")
        .insert(apartmentFacilitiesParams)
        .select();

      console.log(
        "ApartmentRepository::add:: facilities inserted successfully"
      );

      let apartmentStarpointsParams = params.keywords.starpoint_ids.map(
        (starpoint) => {
          return {
            apartment_id: apartmentRow.data[0].id,
            starpoint_id: starpoint,
          };
        }
      );
      let starpoints = await supabase
        .from("ApartmentStarPoints")
        .insert(apartmentStarpointsParams)
        .select();
      console.log(
        "ApartmentRepository::add:: starpoints inserted successfully"
      );
      let aparmtentImagesParams = params.images.image_urls.map((image) => {
        return {
          apartment_id: apartmentRow.data[0].id,
          image_url: image,
        };
      });
      let imageRow = await supabase
        .from("ApartmentImages")
        .insert(aparmtentImagesParams)
        .select();

      console.log("ApartmentRepository::add:: images inserted successfully");

      return {
        data: "successfully added your apartment",
      };
    } catch (error) {
      console.log("ApatientRepository::add:: error: " + error);
      return { error: {message: error.message} };
    }
  };

  // advance search with filters
  advanceSearch = async (params) => {
    try {
      const {
        beds, // e.g. ['1', '2', '3']
        baths,
        price_min,
        price_max,
        area_min,
        area_max,
      } = params;

      // console.log(params)
      const { data, error } = await supabase
        .from("Apartment")
        .select(
          `
                *, 
                location: Location!inner(*),
                images: ApartmentImages!inner(image_url),
                facilities: ApartmentFacilities(facility:Facilities(facilities_id, title)), 
                starpoints: ApartmentStarPoints(starpoint:Starpoints(starpoint_id, title))
                `
        )
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
