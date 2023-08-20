const UserRepository = require("../repository/user");
const repo = new UserRepository();

class UserController {


  setPreference = async (req, res) => {
    console.log("UserController::setPreference");
    const { data, error } = await repo.setPreference(req.body);
    if (error) {
      res.status(500).json(error);
    }
    res.status(200).json(data);
  };


  getPreference = async (req, res) => {
    console.log("UserController::getPreference");
    const { data, error } = await repo.getPreference(req.body);
    if (error) {
      res.status(500).json(error);
    }
    res.status(200).json(data[0]);
  };

}

module.exports = UserController;
