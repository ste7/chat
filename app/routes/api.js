const express = require('express');
const router = express.Router();
const auth = require("../helper/auth");


/**
 * Controllers
 */
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const validationController = require('../controllers/validationController');
const chatController = require('../controllers/chatController');
const searchController = require('../controllers/searchController');


/**
 * Routes
 */
router.post('/api/signup', authController.post_signup);
router.post('/api/signin', authController.post_signin);
router.get('/api/user/auth', auth.verify, authController.get_auth);
router.get('/api/unique/:email', validationController.get_unique);

router.post('/api/pusher/auth', chatController.post_auth);

router.get('/api/users/:user_id', userController.get_users);
router.get('/api/user/:user_one/:user_two', userController.get_user);
router.get('/api/send-request/:user_one/:user_two', userController.get_sendRequest);
router.get('/api/accept-request/:user_one/:user_two', userController.get_acceptRequest);
router.get('/api/requests/:id', userController.get_requests);
router.get('/api/unseen-requests/:id', userController.get_unseenRequests);
router.get('/api/mark-requests-as-seen/:id', userController.get_markRequestsAsSeen);

router.post('/api/chat/send-message', chatController.post_sendMessage);
router.get('/api/chat/conversations/:user_id', chatController.get_conversations);
router.get('/api/chat/conversation/:id', chatController.get_conversation);
router.get('/api/mark-messages-as-seen/:id', chatController.get_markMessagesAsSeen);

router.post('/api/search', searchController.post_search);



module.exports = router;