const WishlistRepository = require("../repository/wishlist");
const repo = new WishlistRepository();

class WishlistController {
  addToWishlist = async (req, res) => {
    console.log("WishlistController::addToWishlist");
    const user_id = req.body.user.id;
    const apartment_id = req.body.apartment_id;
    const {data, error, code} = await repo.addToWishlist(user_id, apartment_id);
    if(error){
      res.status(code).json({
        code : code,
        message: error,
      });
      return;
    }
    res.status(201).json(data);
  }

  getWishlist = async (req, res) => {
    console.log("WishlistController::getAllWishlist");
    const id = req.body.user.id;
    const {data, error, code} = await repo.getWishlist(id);
    console.log(data);
    if(error){
      console.log(`WishlistController::getAllWishlist:: error: ${error}`);
      res.status(code).json({
        code : code,
        message: error,
      });
      return;
    }

    res.status(200).json(data);
  };

  removeFromWishlist = async (req, res) => {
    console.log("WishlistController::removeFromWishlist");
    const user_id = req.body.user.id;
    // get apartment id from url
    const apartment_id = req.params.apartment_id;
    const {message, error, code} = await repo.removeFromWishlist(user_id, apartment_id);
    if(error){
      res.status(code).json({
        code : code,
        message: error,
      });
      return;
    }
    res.status(200).json({
      message: message,
    });
  }
}

module.exports = WishlistController;