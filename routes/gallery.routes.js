var express = require('express');
var router = express.Router();
var Gallery = require('../controllers/gallery.controller');

// File uploading
var fs = require('fs');
var multer = require('multer'); // v1.0.5
var upload = multer({ 
	dest: 'uploads/',
	limits: {
        //fields: 0,
        fieldSize: 5000000
    }
})
//dest: 'tmp/',
    
var cpUpload = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'gallery', maxCount: 12 }])

// GET
router.get('/getAllGalleries', Gallery.getAllGalleries);
router.get('/:id', Gallery.getGalleryById);

// POST
router.post('/insertFilesToGalleryId', cpUpload, Gallery.insertFilesToGalleryId);
// router.post('/addUserIdToEvent', Gallery.addUserIdToEvent);

module.exports = router;