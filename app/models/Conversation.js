const mongoose = require('../database/db');
const Schema = mongoose.Schema;
const schemaPlugin = require('../helper/schemaPlugin');


const schema = new Schema({
    friends: {
        user_one: {
            id: Schema.ObjectId,
            name: String
        },
        user_two: {
            id: Schema.ObjectId,
            name: String
        },
        accepted: { type: Boolean, default: false },
        seen: { type: Boolean, default: false }
    },
    messages: [{
        sender: {
            id: Schema.ObjectId,
            name: String
        },
        body: String,
        seen: { type: Boolean, default: false },
        createdAt: { type : Date, default : Date.now }
    }],
    createdAt: { type : Date, default : null },
    updatedAt: { type : Date, default : Date.now }
});


schema.plugin(schemaPlugin);


module.exports = mongoose.model('conversations', schema);