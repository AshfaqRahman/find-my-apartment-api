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
    console.log("ApartmentRepository::findApartmentById");
    let { data, error } = await supabase.rpc("fetch_apartment_details", {
      curr_user_id,
      f_apartment_id,
    });
    //console.log(data);

    if (error) {
      console.log(`ApartmentRepository::findApartmentById:: error: ${error}`);
      console.log(error);
      return {
        error: "Apartment not found",
        code: 404,
      };
    }

    return { data: data[0] };
  };

  add = async (params) => {
    console.log("ApartmentRepository::add");

    try {
      let locationParams = params.location;
      let location = await supabase
        .from("Location")
        .insert(locationParams)
        .select();
      if (location.error) throw location.error;

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
      return { error: { message: error.message } };
    }
  };

  edit = async (params) => {
    console.log("ApartmentRepository::edit");

    try {
      let apartmentParams = params.apartment;
      apartmentParams.owner_id = params.user.id;
      let apartmentRow = await supabase
        .from("Apartment")
        .update(apartmentParams)
        .eq("id", apartmentParams.id)
        .select();
      if (apartmentRow.error) throw apartmentRow.error;
      console.log("ApartmentRepository::edit:: apartment updated successfully");

      let locationParams = params.location;
      locationParams["id"] = apartmentRow.data[0].location_id;
      let location = await supabase
        .from("Location")
        .update(locationParams)
        .eq("id", locationParams.id)
        .select();
      if (location.error) throw location.error;
      console.log("ApartmentRepository::edit:: location updated successfully");

      let apartmentFacilitiesParams = params.facilities.facility_ids.map(
        (facility) => {
          return {
            apartment_id: apartmentParams.id,
            facilities_id: facility,
          };
        }
      );
      let facilities = await supabase
        .from("ApartmentFacilities")
        .delete()
        .eq("apartment_id", apartmentParams.id);
      if (facilities.error) throw facilities.error;
      facilities = await supabase
        .from("ApartmentFacilities")
        .insert(apartmentFacilitiesParams)
        .select();
      if (facilities.error) throw facilities.error;
      console.log(
        "ApartmentRepository::edit:: facilities updated successfully"
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
        .delete()
        .eq("apartment_id", apartmentParams.id);
      if (starpoints.error) throw starpoints.error;
      starpoints = await supabase
        .from("ApartmentStarPoints")
        .insert(apartmentStarpointsParams)
        .select();
      if (starpoints.error) throw starpoints.error;
      console.log(
        "ApartmentRepository::edit:: starpoints updated successfully"
      );

      let aparmtentImagesParams = params.images.image_urls.map((image) => {
        return {
          apartment_id: apartmentRow.data[0].id,
          image_url: image,
        };
      });
      let imageRow = await supabase
        .from("ApartmentImages")
        .delete()
        .eq("apartment_id", apartmentParams.id);
      if (imageRow.error) throw imageRow.error;
      imageRow = await supabase
        .from("ApartmentImages")
        .insert(aparmtentImagesParams)
        .select();
      if (imageRow.error) throw imageRow.error;

      console.log("ApartmentRepository::edit:: images updated successfully");

      return {
        data: "successfully edited your apartment",
      };
    } catch (error) {
      console.log("ApatientRepository::edit:: error: " + error);
      return { error: { message: error.message } };
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

      let { data, error } = await supabase.rpc("advance_search", {
        curr_user_id: user_id,
        s_bedrooms: beds,
        s_max_area: area_max,
        s_max_price: price_max,
        s_min_area: area_min,
        s_min_price: price_min,
        s_washrooms: baths,
      });

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
    let query = `
    SELECT
        a.id,
        a.bedrooms,
        a.washrooms,
        a.area_sqft,
        a.price,
        a.blueprint_url,
        a.created_at,
        a.owner_id,
        a.occupied,
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
            SELECT COUNT(*)
            FROM "ApartmentFacilities"
            JOIN "Facilities" ON "ApartmentFacilities".facilities_id = "Facilities".facilities_id
            WHERE "ApartmentFacilities".apartment_id = a.id
        ) as fac_count,
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
        AND (a.id IN (
          SELECT apartment_id
          FROM "ApartmentFacilities"
          WHERE facilities_id = ANY($8)
          GROUP BY apartment_id
          HAVING COUNT(DISTINCT facilities_id) = array_length($8, 1)
        )
          OR NOT EXISTS (
            select 1 
            from "ApartmentFacilities"
            where facilities_id = ANY($8)
          )
        )
        AND (a.id IN (
            SELECT apartment_id
            FROM "ApartmentStarPoints"

            WHERE starpoint_id = ANY($9)
            GROUP BY apartment_id
            HAVING COUNT(DISTINCT starpoint_id) = array_length($9, 1)
        )
          
          OR NOT EXISTS (
            select 1 
            from "ApartmentStarPoints"
            where starpoint_id = ANY($9)
          )
        )
        AND a.types && $10
    GROUP BY
        a.id;
  `;

    let values = [
      params.user_id,
      params.beds,
      params.baths,
      params.price_min,
      params.price_max,
      params.area_min,
      params.area_max,
      params.facilities,
      params.keywords,
      params.apartmentTypes,
    ];

    console.log("AdvanceSearchQuery::query:");

    // db query
    const db = await getConnection();
    
    let data = await db.query(query, values);
    const rows = data.rows;
    query = `
    insert into
      "SearchHistory" (user_id, zone)
    values
      ($1, $2)
    `;
    values = [
      params.user_id,
      params.zone,
    ]

    data = await db.query(query, values);


    // console.log(data.facilitiesCount);

    db.release();

    return rows;
  };

  getApartmentByUser = async (user_id) => {
    console.log("ApartmentRepository::getApartmentByUser");
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
          a.occupied,
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
      WHERE a.owner_id = $1
      GROUP BY
          a.id;
    `;

    // get connection
    const db = await getConnection();
    // execute query
    const { rows } = await db.query(query, [user_id]);
    // release connection
    db.release();

    return { data: rows };
  };

  toggleStatus = async (params) => {
    // console.log(params);

    // update
    try {
      let query = `
        update "Apartment"  
        set
          occupied = $1
        where
          owner_id = $2
          and id = $3;
      `;

      let values = [params.occupied, params.user.id, params.apartment_id];

      const db = await getConnection();
      const data = await db.query(query, values);

      db.release();

      return {
        data: {
          message: params.occupied
            ? `apartment is now occupied`
            : `apartment is now vacant`,
        },
      };
    } catch (error) {
      console.log("toggleStatus:: error :: ", error.message);
      return {
        error: error.message,
      };
    }
  };

  deleteApartment = async (params) => {
    console.log("ApartmentRepository::deleteApartment");
    console.log(params);
    try {
      let query = `
        delete from "Apartment"
        where
          id = $1 and
          owner_id = $2;
      `;

      let values = [params.apartment_id, params.user_id];

      const db = await getConnection();
      const data = await db.query(query, values);

      db.release();

      return {
        data: {
          message: `your apartment is deleted`,
        },
      };
    } catch (error) {
      console.log("deleteApartment:: error :: ", error);
      return {
        error: error.message,
      };
    }
  };
}

// export
module.exports = ApartmentRepository;
