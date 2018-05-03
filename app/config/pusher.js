const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '486114',
    key: '54831e065f39e90fe0e4',
    secret: '8ede2063e1ad2aa0a27d',
    cluster: 'eu',
    encrypted: false
});


module.exports = pusher;