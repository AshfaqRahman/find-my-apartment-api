const PostRepository = require("../repository/post");
const { getDistance } = require("../services/google-map-distance");
const repo = new PostRepository();

class PostController {
    postSubmit = async (req, res) => {
        console.log("PostController::postSubmit");
        const { data, error, code } = await repo.postSubmit(req.body);
        if (error) {
            res.status(code).json({
                message: error,
                code: code,
            });
            return;
        }
        res.status(200).json(data);
    };

    fetchAllPosts = async (req, res) => {
        console.log("PostController::fetchAllPosts");
        const data = await repo.fetchAllPosts();
        res.json(data);
    }

    fetchFilteredPosts = async (req, res) => {
        console.log("PostController::fetchFilteredPosts");

        // console.log("TEST + " + req.query.gender);

        const params = {
            gender: req.query.gender === undefined
                ? ["Male", "Female"] 
                : req.query.gender,
            beds:
                req.query.beds === undefined
                ? Array.from(Array(20).keys())
                : req.query.beds.map((bed) => parseInt(bed)), // 5+
            baths:
                req.query.baths === undefined
                ? Array.from(Array(20).keys())
                : req.query.baths.map((bath) => parseInt(bath)), // 5+
            roommates: 
                req.query.roommates === undefined
                ? Array.from(Array(20).keys())
                : req.query.roommates.map((roommate) => parseInt(roommate)), // 5+
            residents: 
                req.query.residents === undefined
                ? Array.from(Array(20).keys())
                : req.query.residents.map((resident) => parseInt(resident)), // 5+
            price_min: +req.query.price_min,
            price_max: +req.query.price_max,
            area_min: +req.query.area_min,
            area_max: +req.query.area_max,
            facilities: req.query.facilities === undefined 
                ? [] : req.query.facilities,
            keywords: req.query.keywords === undefined 
                ? [] : req.query.keywords,
        };

        // if (params.beds.includes(5)) {
        //     for (let i = 5; i <= 20; i++) {
        //         params.beds.push(i);
        //     }
        // }

        // if (params.baths.includes(5)) {
        //     for (let i = 5; i <= 20; i++) {
        //         params.baths.push(i);
        //     }
        // }

        // if (params.roommates.includes(5)) {
        //     for (let i = 5; i <= 20; i++) {
        //         params.roommates.push(i);
        //     }
        // }

        // if (params.residents.includes(5)) {
        //     for (let i = 5; i <= 20; i++) {
        //         params.residents.push(i);
        //     }
        // }

        // console.log(params);
        let data = await repo.fetchFilteredPosts(params);

        let center = req.query.location;
        let radius = +req.query.radius;
        let filteredData = [];

        if (center.lat !== undefined && center.lng !== undefined && radius !== undefined && radius !== 0) {
            let origin = `${center.lat},${center.lng}`;
            let destinations = data
              .map(
                (datum) => `${datum.location.latitude},${datum.location.longitude}`
              )
              .join("|");
            let result = await getDistance(origin, destinations);
            for (let index = 0; index < result.rows[0].elements.length; index++) {
              const element = result.rows[0].elements[index];
              if (element.distance.value <= radius * 1000) {
                filteredData.push(data[index]);
              }
            }
        } else {
            filteredData = data;
        }

        res.status(200).json(filteredData);
    }
}

module.exports = PostController;