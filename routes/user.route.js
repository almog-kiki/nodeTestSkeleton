const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');

// get all users
router.get('/find', user_controller.find);
router.get('/getGithubUser/:username',user_controller.getUser)

module.exports = router;
