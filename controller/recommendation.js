const RecommendationRepository = require("../repository/recommendation");
const { search } = require("../routes/recomendation");
const repo = new RecommendationRepository();

class RecommendationController{
  recommendationByPreference= async(req, res) => {
    const user_id = req.body.user.id;
    const result = await repo.recommendationByPreference(user_id);
    return res.status(result.code).json(result);
  };

  recommendationByWishList = async(req, res) => {
    const user_id = req.body.user.id;
    const result = await repo.recommendationByWishList(user_id);
    return res.status(result.code).json(result);
  };

  // recommendation by wishlist
  recommend = async (req, res) => {
    const user_id = req.body.user.id;
    // get the query params
    const isWishList = req.query.wishlist;
    const isPreference = req.query.preference;
    const isSearchHistory = req.query.search_history;
    var result = null;
    if(isPreference && isPreference === 'true'){
      result = await repo.recommendationByPreference(user_id);
    }

    if(isWishList && isWishList === 'true'){
      result = await repo.recommendationByWishList(user_id);
    }

    if(isSearchHistory && isSearchHistory === 'true'){
      result = await repo.recommendationByZone(user_id);
    }

    if(result){
      return res.status(result.code).json(result);
    }else{
      return {
        success: false,
        code: 500,
        message: "Invalid query params"
      }
    }
  };

}

module.exports = RecommendationController;
