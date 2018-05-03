const pusher = require('../config/pusher');
const User = require('../models/User');
const Conversation = require('../models/Conversation');



exports.post_auth = function (req, res, next) {
    let socket_id = req.body.socket_id;
    let channel_name = req.body.channel_name;

    var auth = pusher.authenticate(socket_id, channel_name);

    res.send(auth);
};



exports.get_conversations = function (req, res) {
    var user_id = req.params.user_id;

    Conversation.find({
        '$or': [
            { 'friends.user_one.id': user_id, 'friends.accepted': true },
            { 'friends.user_two.id': user_id, 'friends.accepted': true }
        ]}).sort({ 'updatedAt': -1}).exec(function (err, conversations) {
            res.json(conversations);
    });
};



exports.get_conversation = function (req, res) {
    var id = req.params.id;

    Conversation.findById(id).sort({ 'createdAt': 1}).exec(function (err, conversation) {
        res.json(conversation);
    });
};


exports.get_markMessagesAsSeen = function (req, res) {
    var id = req.params.id;

    Conversation.findById(id).sort({ 'createdAt': 1}).exec(function (err, conversation) {
        res.json(conversation);
    });
};



exports.post_sendMessage = function (req, res) {
    let id = req.body.conversation_id;
    let sender = req.body.sender;
    let message = req.body.message;

    Conversation.findByIdAndUpdate( id,
        {
            $push: { "messages":
                {
                    "sender": {
                        "id": sender.id,
                        "name": sender.name
                    },
                    "body": message
                }
            }
        }, { new: true },
        function(err, conversation) {
            let message = conversation.messages[conversation.messages.length - 1];

            var d = {
                message,
                id
            };

            pusher.trigger(`private-chat-${id}`, 'messages-event', {
                message,
                id
            });

            res.json(d);
        }
    );
};