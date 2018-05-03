const User = require('../models/User');


exports.get_unique = function (req, res) {
    let email = req.params.email;

    User.findOne({ email: email }).exec(function (err, user) {
        if (user) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
};