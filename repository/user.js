const { getConnection } = require("../config/database");
// import supabase
const supabase = require("../config/supabase");

class UserRepository {
  setPreference = async (params) => {
    console.log("UserRepository::setPreference");
    try {
      let locationParams = params.location;
      let location = await supabase
        .from("Location")
        .insert(locationParams)
        .select();
      if (location.error) throw location.error;

      console.log(
        "UserRepository::preference:: location inserted successfully"
      );

      let userPreferenceParams = params.user_preference;
      userPreferenceParams.center_id = location.data[0].id;
      userPreferenceParams.user_id = params.user.id;
      let userPreferenceRow = await supabase
        .from("UserPreference")
        .upsert(userPreferenceParams)
        .select();

      console.log(
        "UserRepository::preference:: preference upserted successfully"
      );

      // delete facilities with the same user id
      let deleteFacilities = await supabase
        .from("UserPreferenceFacilities")
        .delete()
        .match({ user_preference_id: userPreferenceRow.data[0].user_id })
        .select();

      let userPreferenceFacilitiesParams = params.facilities.facility_ids.map(
        (facility) => {
          return {
            user_preference_id: userPreferenceRow.data[0].user_id,
            facilities_id: facility,
          };
        }
      );
      let facilities = await supabase
        .from("UserPreferenceFacilities")
        .insert(userPreferenceFacilitiesParams)
        .select();

      console.log(
        "UserRepository::preference:: facilities inserted successfully"
      );

      // delete starpoints with the same user id
      let deleteStarpoints = await supabase
        .from("UserPreferenceStarpoints")
        .delete()
        .match({ user_preference_id: userPreferenceRow.data[0].user_id })
        .select();

      let userPreferenceStarpointsParams = params.keywords.starpoint_ids.map(
        (starpoint) => {
          return {
            user_preference_id: userPreferenceRow.data[0].user_id,
            starpoint_id: starpoint,
          };
        }
      );
      let starpoints = await supabase
        .from("UserPreferenceStarpoints")
        .insert(userPreferenceStarpointsParams)
        .select();
      console.log(
        "UserRepository::preference:: starpoints inserted successfully"
      );

      return {
        data: "successfully updated your preference",
      };
    } catch (error) {
      console.log("UserRepository::preference:: error: " + error);
      return { error: { message: error.message } };
    }
  };

  getPreference = async (params) => {
    console.log("UserRepository::getPreference");
    try {
      let userPreference = await supabase
      .from("UserPreference")
      .select(
        `
          *,
          location: Location!inner(*),
          facilities: UserPreferenceFacilities(facility:Facilities(facilities_id, title)), 
          keywords: UserPreferenceStarpoints(starpoint:Starpoints(starpoint_id, title))
        `
      )
      .eq("user_id", params.user.id) ;

      if(userPreference.error) throw userPreference.error;
      return { data: userPreference.data }

    } catch (error) {
      console.log("UserRepository::getPreference:: error: " + error);
      return { error: { message: error.message } };
    }
  };

  getUserInfo = async (params) => {
    console.log("UserRepository::getUserInfo");
    try {
      let userInfo = await supabase
      .from("users")
      .select(
        `
          first_name,
          last_name,
          email,
          phone_no,
          gender
        `
      )
      .eq("id", params.user.id);
      console.log(userInfo);

      if(userInfo.error) throw userInfo.error;
      return { data: userInfo.data }

    } catch (error) {
      console.log("UserRepository::getUserInfo:: error: " + error);
      return { error: { message: error.message } };
    }
  };
}

// export
module.exports = UserRepository;
