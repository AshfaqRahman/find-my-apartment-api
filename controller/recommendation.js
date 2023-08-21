const RecommendationRepository = require("../repository/recommendation");
const repo = new RecommendationRepository();

class RecommendationController{
  recommendationByPreference= async(req, res) => {
    console.log("RecommendationController::recommendationByPreference");

    const user_id = req.body.user.id;
    const {data, error, code} = await repo.recommendationByPreference(user_id);

    if(error){
      console.log(`RecommendationController::recommendationByPreference:: error: ${error}`);
      res.status(code).json({
        code : code,
        message: error,
      });
      return;
    }

    res.status(200).json(data);
  };
}

module.exports = RecommendationController;
