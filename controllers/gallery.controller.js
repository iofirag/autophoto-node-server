console.log('import gallery.controller')

var fs = require('fs');
var db = require("../config/firebase.config").db
var cloudinary = require('cloudinary');



// Gallery

exports.getAllGalleries = (req,res)=>{
	console.log('getAllGalleries() executed')

	var eventsRef = db.ref('/galleries');
		eventsRef.once('value', (snapshot)=>{
    	if (snapshot.val()) {
    		let galleryObj = snapshot.val()
    		//eventPhotosObj.firebaseEventId = snapshot.key
    		return res.json({success:1, description:'GALLERIES_FOUND', data:galleryObj})
		} else {
	      	return res.json({success:0,description:'There is not galleries yet'})
		}
	});
}

exports.getGalleryById = (req,res)=>{
	console.log('getGalleryById() executed',req.params)
	if(req.params && req.params.id) {
		var eventsRef = db.ref('/galleries/'+req.params.id);
			eventsRef.once('value', (snapshot)=>{
	    	if (snapshot.val()) {
	    		let galleryObj = snapshot.val()
	    		//galleryObj.firebaseGalleryId = snapshot.key
	    		return res.json({success:1, description:'GALLERY_FOUND', data:galleryObj})
			} else {
		      	return res.json({success:0,description:'There is not gallery id like: '+req.params.id})
			}
		});
	}else{
		return res.json({errCode: 'GALLERY_SEARCHING_FAIL', description:'gallery searching fail, provide id field', success:0})
	}
}

exports.insertFilesToGalleryId = (req,res)=>{
	console.log('insertFilesToGalleryId() executed', req.body)

	// console.log('files',req.files)
	// console.log('body',req.body)
	if (req.body && req.body.galleryId && req.body.userId ){
		//if(req.files && req.files.gallery){
		//console.log('req.body', req.body);
	    //console.log('req.files', req.files);
		let fileUse = ''
		if ('photo' in req.files){
			fileUse = 'photo'
		}else if('gallery' in req.files){
			fileUse = 'gallery'
		}
		cloudinary.v2.uploader.upload(req.files[fileUse][0].path, {folder:req.body.galleryId},
		//cloudinary.uploader.upload(req.files[fileUse][0].path,

		(cloudinaryErr, cloudinaryRes)=>{ //{folder:req.body.eventId},
			if (cloudinaryErr) {
				console.log('File are not uploaded',cloudinaryErr)
				return res.json({success:0, description:'File are not uploaded'+cloudinaryErr})
		  	}

		  	// save result and userId to firebase
		  	console.log('cloudinaryRes',cloudinaryRes)
		  	if (cloudinaryRes.error){
		  		res.json({success:0, data:cloudinaryRes.error})
		  		deleteFileByPath(req.files[fileUse][0].path)
		  	}else{
			  	var ref = db.ref('/galleries/'+req.body.galleryId);
				var newPhotoNode = ref.push()
				var newPhotoItem = {
					uploadBy: req.body.userId,
					timestamp: Date.now(),
					public_id: cloudinaryRes.public_id,
				    version: cloudinaryRes.version,
				    signature: cloudinaryRes.signature,
				    width: cloudinaryRes.width,
				    height: cloudinaryRes.height,
				    format: cloudinaryRes.format,
				    resource_type: cloudinaryRes.resource_type,
				    created_at: cloudinaryRes.created_at,
				    tags: cloudinaryRes.tags,
				    bytes: cloudinaryRes.bytes,
				    type: cloudinaryRes.type,
				    etag: cloudinaryRes.etag,
				    url: cloudinaryRes.url,
				    secure_url: cloudinaryRes.secure_url,
				    original_filename: cloudinaryRes.original_filename
				}
				//console.log('newPhotoItem',newPhotoItem)
				newPhotoNode.set(newPhotoItem);
				// Add photo db key to the response object
				newPhotoItem.uniqueKey = newPhotoNode.key
				return res.json({success:1, data:newPhotoItem})
				deleteFileByPath(req.files[fileUse][0].path)
		  	}
		});
		
	}else{
		return res.json({success:0, description:'Missing params'})
	}

	// if (!req.files)
	//     return res.status(400).send('No files were uploaded.');
	 
	  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
	 
	  // Use the mv() method to place the file somewhere on your server 
	  // sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
	  //   if (err)
	  //     return res.status(500).send(err);
	 
	  //   res.send('File uploaded!');
	  // });
	//if(req.files){
		// return res.json({success:0})
	//}
    // fs.writeFile(__dirname + "/upload/out.png", base64Data, 'base64', function(err) {
    //     if (err) console.log(err);
    //     fs.readFile(__dirname + "/upload/out.png", function(err, data) {
    //         if (err) throw err;
    //         console.log('reading file...', data.toString('base64'));
            // res.send(data);
    //     });
    // });
    
}
var deleteFileByPath = (path) =>{
	fs.unlink(path, (err)=>{
		if (err){
			console.log('File are not deleted',err)
			throw err;
		}
	});
}
// exports.getGalleryById = (req,res)=>{
// 	console.log('getEventPhotosById() executed',req.params)

// 	if(req.params.galleryId) {
// 		var eventsRef = db.ref('/galleries/'+req.params.galleryId);
// 			eventsRef.once('value', (snapshot)=>{
// 	    	if (snapshot.val()) {
// 	    		let eventPhotosObj = snapshot.val()
// 	    		//eventPhotosObj.firebaseEventId = snapshot.key
// 	    		return res.json({success:1, description:'EVENT_PHOTOS_FOUND', data:eventPhotosObj})
// 			} else {
// 		      	return res.json({success:0,description:'There is not event id like: '+req.params.galleryId})
// 			}
// 		});
// 	}else{
// 		return res.json({errCode: 'EVENT_PHOTOS_FAIL', description:'Found event fail, provide id field', success:0})
// 	}
// }