const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next){
    var token = req.headers["authorization"]; // token
    // check if teken starts with Bearer
    // remove Bearer if it does
    if(token && token.startsWith("Bearer ")){
        token = token.slice(7, token.length);
    }

    // console.log(`authenticateToken token: ${token}`);
    if(token === null || token === undefined || token === "")
        return res.status(401).json({code: 401, message: "Not authorized."})
    
    // verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(error, user){
        if(error)
            return res.status(403).json({error: error.message, message: "your session expired, please login again."});
        req.body.user = user;
        next();
    })
}

// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

module.exports = {authenticateToken, parseJwt}