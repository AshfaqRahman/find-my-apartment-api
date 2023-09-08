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
      postParams.owner_id = params.user.id;
      let postRow = await supabase
        .from("Post")
        .insert(postParams)
        .select();
      if (postRow.error) throw postRow.error;

      console.log(postParams);

      console.log("PostRepository::postSubmit:: post inserted successfully");

      // let postFacilitiesParams = params.facilities.facility_ids.map((facility) => {
      //     return {
      //       post_id: postRow.data[0].id,
      //       facilities_id: facility,
      //     };
      //   }
      // );
      // let facilities = await supabase
      //   .from("PostFacilities")
      //   .insert(postFacilitiesParams)
      //   .select();

      // console.log("PostRepository::postSubmit:: facilities added successfully");

      // let postStarpointsParams = params.keywords.starpoint_ids.map((starpoint) => {
      //     return {
      //       post_id: postRow.data[0].id,
      //       starpoint_id: starpoint,
      //     };
      //   }
      // );
      // let starpoints = await supabase
      //   .from("PostStarPoints")
      //   .insert(postStarpointsParams)
      //   .select();

      // console.log("PostRepository::add:: starpoints added successfully");
      

      return { data : "successfully added post" };
    } catch (error) {
        console.log("PostRepository::postSubmit::Error ", error);
        return { error: "Internal Server Error", code: 500 };
    }
  };

  fetchAllPosts = async () => {
    console.log("PostRepository::fetchAllPosts");

    const db = await getConnection();
    const data = await db.query(`SELECT * FROM "Post"`);
    db.release();

    return data.rows;
  };
}

module.exports = PostRepository;
