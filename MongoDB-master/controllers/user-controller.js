const userModel = require('./../models/users');

   exports.create = (req, res)=> {
        // Create a user
        const User = new userModel({
            name: req.body.name,
            age: req.body.age,
        });
        // Save user in the database
        User.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the user."
                });
            });
    };

    exports.read = (req, res) => {
       userModel.findOne({
           _id: req.params.userId
        }).then(function (user) {
            res.send(user)
        });
    };

    exports.delete = (req, res) => {
        userModel.findByIdAndRemove(req.params.userId)
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
        userModel.find({}, function(err, users) {
            const userMap = {};
            users.forEach(function(user) {
                userMap[user._id] = user;
            });
            res.send(userMap);
        });
    };

