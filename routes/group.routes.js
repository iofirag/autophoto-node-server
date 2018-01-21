var express = require('express');
var router = express.Router();
var Group = require('../controllers/group.controller');

// GET
router.get('/getAllGroups', Group.getAllGroups);
router.get('/:id', Group.getGroupById);

// POST
router.post('/insertUserIdToGroup', Group.insertUserIdToGroup);

module.exports = router;