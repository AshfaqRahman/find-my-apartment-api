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

  findApartmentById = async (curr_user_id, f_apartment_id) => {
    let { data, error } = await supabase.rpc('get_apartment_details', {
            curr_user_id, f_apartment_id
          })

    if (error) {
      console.log(`ApartmentRepository::findApartmentById:: error: ${error}`);
      console.log(error)
      return {
        error: "Apartment not found",
        code: 404,
      }
    }

    return {data:data[0]};
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
        user_id,
        beds, // e.g. ['1', '2', '3']
        baths,
        price_min,
        price_max,
        area_min,
        area_max,
      } = params;
      console.log("user_id: " + user_id);

      let { data, error } = await supabase
  .rpc('advance_search', {
    curr_user_id: user_id, 
    s_bedrooms : beds, 
    s_max_area: area_max,
    s_max_price: price_max, 
    s_min_area: area_min,
    s_min_price: price_min, 
    s_washrooms: baths  
  })


      // console.log(params)
      /* const { data, error } = await supabase
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
        .lte("area_sqft", area_max); */
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

  advanceSearchQuery = async (params) => {

    const query = `
    SELECT
        a.id,
        a.bedrooms,
        a.washrooms,
        a.area_sqft,
        a.price,
        a.blueprint_url,
        a.created_at,
        a.owner_id,
        a.vacancy,
        a.description,
        a.floor,
        a.types,
        to_jsonb(array_agg("ApartmentImages".image_url)) as images,
        (
            SELECT to_jsonb(array_agg("Facilities".title))
            FROM "ApartmentFacilities"
            JOIN "Facilities" ON "ApartmentFacilities".facilities_id = "Facilities".facilities_id
            WHERE "ApartmentFacilities".apartment_id = a.id
        ) as facilities,
        (
            SELECT to_jsonb(array_agg("Starpoints".title))
            FROM "ApartmentStarPoints"
            JOIN "Starpoints" ON "ApartmentStarPoints".starpoint_id = "Starpoints".starpoint_id
            WHERE "ApartmentStarPoints".apartment_id = a.id
        ) as starpoints,
        EXISTS (
            SELECT 1
            FROM "Wishlist"
            WHERE apartment_id = a.id AND user_id = $1
        ) as in_wishlist,
        (
            SELECT jsonb_build_object(
                'division', l.division,
                'district', l.district,
                'zone', l.zone,
                'street_no', l.street_no,
                'house_no', l.house_no,
                'latitude', l.latitude,
                'longitude', l.longitude,
                'created_at', l.created_at,
                'detailed_address', l.detailed_address
            ) AS location
            FROM "Location" AS l
            WHERE l.id = a.location_id
        ) AS location
    FROM
        "Apartment" as a
    JOIN "ApartmentImages" ON a.id = "ApartmentImages".apartment_id
    WHERE
        a.bedrooms = ANY($2)
        AND a.washrooms = ANY($3)
        AND a.price >= $4
        AND a.price <= $5
        AND a.area_sqft >= $6
        AND a.area_sqft <= $7
        AND a.id IN (
          SELECT apartment_id
          FROM "ApartmentFacilities"
          WHERE facilities_id IN ANY($8)
        )
        AND a.id IN (
            SELECT apartment_id
            FROM "ApartmentStarPoints"
            WHERE starpoint_id IN ANY($9)
        )
    GROUP BY
        a.id;
  `;

    const values = [
      params.user_id,
      params.beds,
      params.baths,
      params.price_min,
      params.price_max,
      params.area_min,
      params.area_max,
      params.facilities,
      params.keywords,
    ];

    console.log("AdvanceSearchQuery::query: "+values); 

    // db query
    const db = await getConnection();
    const data = await db.query(query, values);

    db.release();

    return data.rows;

  };


}

// export
module.exports = ApartmentRepository;
