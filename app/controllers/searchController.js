const User = require('./../models/User');

exports.post_search = function (req, res) {
    let query = req.body.query;
    let me = req.body.me;

    let re = '/^' + query + '/i';

    User.find({
        $and: [
                  { name: {$regex: eval(re) } },
                  { _id: {$ne: me} }
              ]
    }).exec(function (err, users) {
        res.json(users);
    })
};