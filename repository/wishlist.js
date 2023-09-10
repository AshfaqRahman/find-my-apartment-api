const { getConnection } = require("../config/database");
// import supabase
const supabase = require("../config/supabase");


class WishlistRepository {
  addToWishlist = async (user_id, apartment_id) => {
    console.log("Wishlist::addToWishlist");
    // use supbase to insert in "Wislist" table
    let { data, error }  = await supabase
      .from("Wishlist")
      .insert({user_id: user_id, apartment_id: apartment_id})
      .select()
      .single(); // select 
    

    if(error){
      console.log(error);
      // check if error message contains duplicate key 
      if(error.message.includes("duplicate key")){
        return { error: "Already in wishlist", code: 409 }
      }
      else return { error: "Internal Server Error", code: 500 }
    }

    console.log("Wishlist::addToWishlist:: inserted successfully");

    return {data};
  };
    


 /*  getWishlist = async (user_id) => {
    console.log("Wishlist::getAllWishlist");
    const { data, error }  = await supabase
      .from("Wishlist")
      .select(`
      Apartment(*)
      `)
      .eq('user_id', user_id); // select all rows after insert
    
    console.log(`Wishlist::getAllWishlist:: data:`);
    console.log(data);
    if(error){
      return { error: "Internal Server Error!", code: 500 }
    }

    return {data};
  }; */

  getWishlist = async (user_id) => {
    console.log("Wishlist::getAllWishlist");
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
          "Wishlist" as w
      JOIN "Apartment" as a ON w.apartment_id = a.id
      JOIN "ApartmentImages" ON a.id = "ApartmentImages".apartment_id
      WHERE w.user_id = $1
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

  removeFromWishlist = async (user_id, apartment_id) => {
    console.log("Wishlist::removeFromWishlist");
    const { data, error }  = await supabase
      .from("Wishlist")
      .delete()
      .eq('user_id', user_id)
      .match({apartment_id: apartment_id}); // select all rows after insert
      
    if(error){
      return { error: "Internal Server Error!", code: 500 }
    }

    return {
      message: "Removed from wishlist",
    }
  }
}

// export the class
module.exports = WishlistRepository;