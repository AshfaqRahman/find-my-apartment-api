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
    


  getWishlist = async (user_id) => {
    console.log("Wishlist::getAllWishlist");
    const { data, error }  = await supabase
      .from("Wishlist")
      .select(`apartment_id`)
      .eq('user_id', user_id); // select all rows after insert
    
    console.log(`Wishlist::getAllWishlist:: data:`);
    console.log(data);
    if(error){
      return { error: "Internal Server Error!", code: 500 }
    }

    return {data};
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