const movieModel = require('./../models/movies');

    exports.create = (req, res)=> {
        const Movie = new movieModel({
            title: req.body.title,
            duration: req.body.duration,
        });
        Movie.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the movie."
            });
        });
    };

    exports.read = (req, res) => {
        movieModel.findOne({
            _id: req.params.movieId
        }).then(function (movie) {
            res.send(movie)
        });
    };

    exports.delete = (req, res) => {
        movieModel.findByIdAndRemove(req.params.movieId)
            .then((response) => {
                res.send({
                    success: true,
                });
            })
            .catch((err) => {
                res.send({
                    success: false,
                    message: err
                });
            });
    };

    exports.listAll = (req, res) => {
        movieModel.find({}, function(err, movies) {
            const movieMap = {};
            movies.forEach(function(movie) {
                movieMap[movie._id] = movie;
            });
            res.send(movieMap);
        });
};