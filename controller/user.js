const UserRepository = require("../repository/user");
const repo = new UserRepository();

class UserController {


  preference = async (req, res) => {
    console.log("UserController::preference");
    const { data, error } = await repo.preference(req.body);
    if (error) {
      res.status(500).json(error);
    }
    res.status(200).json(data);
  };

}

module.exports = UserController;
