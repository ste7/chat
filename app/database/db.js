const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://stefan:stefan@ds147537.mlab.com:47537/chatdb', {});
mongoose.connect('mongodb://localhost:/' + process.env.DB_DATABASE, {});

mongoose.connection.once('open', function () {
    console.log('Connected');
}).on('error', function (error) {
    console.log('Connection error: ' + error);
});


module.exports = mongoose;