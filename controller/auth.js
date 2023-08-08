// import user repository

const bcyrpt = require("bcrypt");
const AuthRepository = require('../repository/auth')
const {generateJwtToken} = require("../utils/jwt_util")

// create user repository instance
const authRepository = new AuthRepository()

// create user controller class
class AuthController {

    // register user
    register = async (req, res) => {
        // get user data from request body
        let params = req.body

        if (!params.email || !params.password)
            return res.status(400).json({ message: "Bad request." });

        params.password = await bcyrpt.hash(params.password, 10);


        // register user
        const { data, error } = await authRepository.register(params)

        if (error) {
            return res.status(400).json({ error })
        }

        // delete password
        delete data.password

        return res.status(201).json(data)
    }

    // login user
    login = async (req, res) => {
        // get user data from request body

        console.log("inside register");
        const cred = req.body;

        if (!cred.email || !cred.password)
            return res.status(400).json({ message: "Bad request." });

        // login user
        const { data, error } = await authRepository.login(cred)

        if (error) {
            console.log(error);
            return res.status(500).json({ error:"Interal server error" })
        }

        if (!data) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Compare the provided password with the stored hashed password
        const match = await bcyrpt.compare(cred.password, data.password);

        // detete password from data
        delete data.password;

        // generate a jwt token
        const jwt = generateJwtToken(data);

        if (match) {
            res.status(200).json({ token: jwt, data});
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }

}

module.exports = AuthController;