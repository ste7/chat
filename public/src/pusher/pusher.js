import Pusher from 'pusher-js'

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

export default new Pusher('54831e065f39e90fe0e4', {
    cluster: 'eu',
    encrypted: false,
    authTransport: 'ajax',
    authEndpoint: 'http://localhost:8000/api/pusher/auth'
});
