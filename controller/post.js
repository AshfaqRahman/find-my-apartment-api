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
}

module.exports = PostController;