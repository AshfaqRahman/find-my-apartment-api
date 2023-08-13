
const supabase = require("../config/supabase");

class FixedValuesRepository {
  getFacilities = async () => {
    console.log("FixedValuesRepository::getFacilities");
    try {
      const { data, error } = await await supabase.from("Facilities").select(`*`);
      if (error) {
        throw error;
      }

      // print data length
      //   console.log(` ${data.length}`);
    //   console.log(data);
      return data;
    } catch (error) {
      console.error("Error performing getFacilities:", error.message);
      return null;
    }
  };

  getStarPoints = async () => {
    console.log("FixedValuesRepository::getStarPoints");
    try {
      const { data, error } = await await supabase.from("Starpoints").select(`*`);
      if (error) {
        throw error;
      }
    //   console.log(data);
      return data;
    } catch (error) {
      console.error("Error performing getStarPoints:", error.message);
      return null;
    }
  };
}

// export
module.exports = FixedValuesRepository;
