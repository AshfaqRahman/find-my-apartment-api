const WishlistRepository = require("../repository/wishlist");
const repo = new WishlistRepository();

class WishlistController {
  addToWishlist = async (req, res) => {
    console.log("WishlistController::addToWishlist");
    const user_id = req.body.user.id;
    const apartment_id = req.body.apartment_id;
    const {data, error_message, code} = await repo.addToWishlist(user_id, apartment_id);
    if(error_message){
      res.status(code).json({
        code : code,
        message: error_message,
      });
      return;
    }
    res.status(code).json(data);
  }

  getWishlist = async (req, res) => {
    console.log("WishlistController::getAllWishlist");
    const id = req.body.user.id;
    const data = await repo.getWishlist(id);
    res.json(data);
  };
}

module.exports = WishlistController;