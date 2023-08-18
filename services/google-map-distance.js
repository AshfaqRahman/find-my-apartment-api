const axios = require("axios")

let googleMapUrl = "https://maps.googleapis.com/maps/api/distancematrix/json"

let getDistance = async (origin, destinations) => {
    // let origin = "22.3468,91.83"
    // let destinations = "22.3468,91.83|23.8041,90.4152"
    let result = await axios.get(googleMapUrl, {
        params: {
            key: process.env.GOOGLE_MAP_API_KEY,
            origins: origin,
            destinations: destinations
        }
    })
    console.log(result.data);
    return result.data;
}

// getDistance([40.6655101,-73.89188969999998])

module.exports = {
    getDistance
}