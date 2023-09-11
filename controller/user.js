const UserRepository = require("../repository/user");
const repo = new UserRepository();

class UserController {


  setPreference = async (req, res) => {
    console.log("UserController::setPreference");
    const { data, error } = await repo.setPreference(req.body);
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.status(200).json(data);
  };


  getPreference = async (req, res) => {
    console.log("UserController::getPreference");
    const { data, error } = await repo.getPreference(req.body);
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.status(200).json(data[0]);
  };


  getUserInfo = async (req, res) => {
    console.log("UserController::getUserInfo");
    const { data, error } = await repo.getUserInfo(req.body);
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.status(200).json(data[0]);
  };

  // get user by id
  // id is given in params
  getUserById = async (req, res) => {
    console.log("UserController::getUserById");
    const result = await repo.getUserById(req.params.user_id);
    return res.status(result.code).json(result);
  }


}

module.exports = UserController;
