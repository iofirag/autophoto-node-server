var express = require('express');
var router = express.Router();
var Event = require('../controllers/event.controller');

// File uploading
var fs = require('fs');
var multer = require('multer'); // v1.0.5
var upload = multer({ dest: 'uploads/'})
var cpUpload = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'gallery', maxCount: 12 }])

// GET
router.get('/getAllEvents', Event.getAllEvents);
// router.get('/getEventPhotosById/:id', Event.getEventPhotosById);
router.get('/:id', Event.getEventById);

// POST
// router.post('/addFilesToEventGallery', cpUpload, Event.addFilesToEventGallery);
router.post('/createEvent', Event.createEvent);
// router.post('/addUserIdToEvent', Event.addUserIdToEvent);

module.exports = router;