const { getConnection } = require("../config/database");
const supabase = require("../config/supabase");

class PostRepository {
  postSubmit = async (params) => {
    console.log("PostRepository::postSubmit");

    console.log(params);

    try {
      let locationParams = params.location;
      let location = await supabase
        .from("Location")
        .insert(locationParams)
        .select();
      if (location.error) throw location.error;

      let { data, error } = await supabase
        .from("Post")
        .insert({
          apartment_id: params.apartment_id,
          post_title: params.post_title,
          post_body: params.post_body,
          post_owner: params.user.id,
          bedrooms: params.bedrooms,
          bathrooms: params.bathrooms,
          price: params.price,
          location_id: location.data[0].id,
        })
        .select()
        .single();

      if (error) {
        console.log(error);

        return { error: "Internal Server Error", code: 500 };
      }

      console.log(data);

      console.log("Post::postSubmit:: inserted successfully");
      return { data };

      // const query =  `
      // INSERT into Post(apartment_id, post_title, post_body, post_owner, ap_type, bedrooms, bathrooms, price, location)
      // VALUES
      // ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      // `

      // const values = [
      //     params.id,
      //     params.apartment_id,
      //     params.post_title,
      //     params.post_body,
      //     params.post_owner
      // ]

      // const db = await getConnection();
      // const data = await db.query(query, values);

      // db.release();

      // return data.rows;
    } catch (error) {
        console.log("Maruf ", error);
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
