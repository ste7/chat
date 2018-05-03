const User = require('../models/User');
const Conversation = require('../models/Conversation');
const pusher = require('../config/pusher');


exports.get_users = function (req, res) {
    var me = req.params.user_id;

    User.find({_id: {$ne: me}}).exec(function (err, users) {
        res.json(users);
    });
};


exports.get_user = function (req, res) {
    var me = req.params.user_one;
    var friend = req.params.user_two;

    User.findById(friend).exec(function (err, user) {
        Conversation.find({'$or': [
            {'friends.user_one.id': me, 'friends.user_two.id': friend, 'friends.accepted': true },
            {'friends.user_one.id': friend, 'friends.user_two.id': me, 'friends.accepted': true }
        ]}).exec(function (err, chat) {
            Conversation.find({'friends.user_one.id': me, 'friends.user_two.id': friend, 'friends.accepted': false }).exec(function (err, requestFromMe) {
                Conversation.find({'friends.user_one.id': friend, 'friends.user_two.id': me, 'friends.accepted': false }).exec(function (err, requestForMe) {
                    res.json({
                        user: user,
                        requestFromMe: requestFromMe,
                        requestForMe: requestForMe,
                        chat: chat
                    });
                });
            });
        });
    });
};


exports.get_sendRequest = function (req, res) {
    let me_id = req.params.user_one;
    let friend_id = req.params.user_two;

    User.findOne({ _id: me_id }).exec(function (err, me) {
        User.findOne({ _id: friend_id }).exec(function (err, friend) {

            let c = new Conversation({
                friends: {
                    user_one: {
                        id: me._id,
                        name: me.name
                    },
                    user_two: {
                        id: friend._id,
                        name: friend.name
                    }
                }
            });
            c.save();

            pusher.trigger(`friendship-${friend_id}`, 'request', {
                friend_id
            });

            res.json(c);
        });
    });
};


exports.get_acceptRequest = function (req, res) {
    let me = req.params.user_one;
    let friend = req.params.user_two;


    User.findById(me).exec(function (err, u) {
        Conversation.findOneAndUpdate({'friends.user_one.id': friend, 'friends.user_two.id': me},
            { $set: {"friends.accepted": true }}, { new: true }, function(err, updated) {
                Conversation.findByIdAndUpdate( updated._id,
                    {$push: { "messages":
                        {
                            "sender": {
                                "id": me,
                                "name": u.name
                            },
                            "body": 'We are friend now 😉'
                        }
                    }
                    }, { new: true },
                    function(err, conversation) {
                        pusher.trigger(`friendship-${friend}`, 'accepted-request', {
                            updated
                        });

                        res.json(conversation);
                    }
                );
            });
    });
};



exports.get_requests = function (req, res) {
    var id = req.params.id;

    Conversation.find({ "friends.user_one.id": id, "friends.accepted": false  }).exec(function (err, fromMe) {
        Conversation.find({ "friends.user_two.id": id, "friends.accepted": false  }).exec(function (err, forMe) {
            res.json({
                fromMe: fromMe,
                forMe: forMe
            })
        });
    });
};



exports.get_unseenRequests = function (req, res) {
    var id = req.params.id;

    Conversation.find({ "friends.user_two.id": id, "friends.accepted": false, "friends.seen": false  }).exec(function (err, requests) {
        res.json(requests);
    });
};


exports.get_markRequestsAsSeen = function (req, res) {
    var id = req.params.id;

    Conversation.findOneAndUpdate(
        { "friends.user_two.id": id, "friends.accepted": false, "friends.seen": false  },
        { $set: {"friends.seen": true }}, { new: true }
        ).exec(function (err, requests) {
        res.json(requests);
    });
};