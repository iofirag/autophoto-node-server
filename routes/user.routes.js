var express = require('express');
var router = express.Router();
var User = require('../controllers/user.controller');


// GET
router.get('/getAllUsers', User.getAllUsers);

// POST
router.post('/createUser', User.createUser);
router.post('/getName', User.getNameByFbaseID);


module.exports = router;