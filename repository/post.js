const { getConnection } = require("../config/database");
const supabase = require("../config/supabase");

class PostRepository {
  postSubmit = async (params) => {
    console.log("PostRepository::postSubmit");

    try {
      let locationParams = params.location;
      let location = await supabase
        .from("Location")
        .insert(locationParams)
        .select();
      if (location.error) throw location.error;

      console.log("PostRepository::postSubmit:: location inserted successfully");

      let postParams = params.post_data;
      postParams.location_id = location.data[0].id;
      postParams.post_owner = params.user.id;
      let postRow = await supabase.from("Post").insert(postParams).select();
      if (postRow.error) throw postRow.error;

      // console.log(postParams);
      console.log("PostRepository::postSubmit:: post inserted successfully");
      
      const post_id = postRow.data[0].id;
      // console.log(post_id);

      let postFacilitiesParams = params.facilities.facility_ids.map(
        (facility) => {
          return {
            post_id: post_id,
            facilities_id: facility,
          };
        }
      );
      let facilities = await supabase
        .from("PostFacilities")
        .insert(postFacilitiesParams)
        .select();
      if (facilities.error) throw facilities.error;

      // console.log(postFacilitiesParams);
      // console.log(facilities);

      console.log("PostRepository::postSubmit:: facilities added successfully");

      let postStarpointsParams = params.keywords.starpoint_ids.map(
        (starpoint) => {
          return {
            post_id: post_id,
            starpoint_id: starpoint,
          };
        }
      );
      let starpoints = await supabase
        .from("PostStarPoints")
        .insert(postStarpointsParams)
        .select();
      if (starpoints.error) throw starpoints.error;

      console.log("PostRepository::add:: starpoints added successfully");

      return { data: "successfully added post" };
    } catch (error) {
      console.log("PostRepository::postSubmit::Error ", error);
      return { error: "Internal Server Error", code: 500 };
    }
  };

  fetchAllPosts = async () => {
    console.log("PostRepository::fetchAllPosts");

    let query = `SELECT "Post".*, "Location".zone, "Location".district, "Location".division, 
    (
        SELECT to_jsonb(array_agg("Facilities".title))
        FROM "PostFacilities"
        JOIN "Facilities" ON "PostFacilities".facilities_id = "Facilities".facilities_id
        WHERE "PostFacilities".post_id = "Post".id
    ) as facilities, 
    (
        SELECT to_jsonb(array_agg("Starpoints".title))
        FROM "PostStarPoints"
        JOIN "Starpoints" 
        ON "PostStarPoints".starpoint_id = "Starpoints".starpoint_id
        WHERE "PostStarPoints".post_id = "Post".id
    ) as starpoints 
    FROM "Post" 
    INNER JOIN "Location" 
    ON "Post".location_id = "Location".id`;

    const db = await getConnection();
    const data = await db.query(query);

    db.release();

    return data.rows;
  };

  fetchFilteredPosts = async (params) => {
    const query =  `
    SELECT
        p.id,
        p.gender,
        p.bedrooms,
        p.bathrooms,
        p.roommates,
        p.residents,
        p.area_sqft,
        p.price,
        p.post_owner,
        p.post_title,
        p.post_body,
        (
            SELECT to_jsonb(array_agg("Facilities".title))
            FROM "PostFacilities"
            JOIN "Facilities" ON "PostFacilities".facilities_id = "Facilities".facilities_id
            WHERE "PostFacilities".post_id = p.id
        ) as facilities,
        (
            SELECT to_jsonb(array_agg("Starpoints".title))
            FROM "PostStarPoints"
            JOIN "Starpoints" ON "PostStarPoints".starpoint_id = "Starpoints".starpoint_id
            WHERE "PostStarPoints".post_id = p.id
        ) as starpoints,
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
            WHERE l.id = p.location_id
        ) AS location
    FROM
        "Post" as p
    WHERE
        p.gender = ANY($1)
        AND p.bedrooms = ANY($2)
        AND p.bathrooms = ANY($3)
        AND p.roommates = ANY($4)
        AND p.residents = ANY($5)
        AND p.price >= $6
        AND p.price <= $7
        AND p.area_sqft >= $8
        AND p.area_sqft <= $9
        AND (p.id IN (
          SELECT post_id
          FROM "PostFacilities"
          WHERE facilities_id = ANY($10)
          GROUP BY post_id
          HAVING COUNT(DISTINCT facilities_id) = array_length($10, 1)
        )
          OR NOT EXISTS (
            select 1 
            from "PostFacilities"
            where facilities_id = ANY($10)
          )
        )
        AND (p.id IN (
            SELECT post_id
            FROM "PostStarPoints"

            WHERE starpoint_id = ANY($11)
            GROUP BY post_id
            HAVING COUNT(DISTINCT starpoint_id) = array_length($11, 1)
        )
          
          OR NOT EXISTS (
            select 1 
            from "PostStarPoints"
            where starpoint_id = ANY($11)
          )
        )
    GROUP BY
        p.id;
    `;
    
    const values = [
      params.gender,
      params.beds,
      params.baths,
      params.roommates,
      params.residents,
      params.price_min,
      params.price_max,
      params.area_min,
      params.area_max,
      params.facilities,
      params.keywords
    ];

    // console.log("fetchFilteredPosts::query: " + values);

    const db = await getConnection();
    const data = await db.query(query, values);

    db.release();

    return data.rows;
  }
}

module.exports = PostRepository;
