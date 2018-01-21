'use strict'
/************* Moduls **************/
, express = require('express')
, bodyParser = require('body-parser')
, os = require("os")
, publicIp = require('public-ip')


var app = express();
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 80;
// to support JSON-encoded bodies
app.use( bodyParser.json() );

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

require('./config/cloudinary.config')
require('./config/firebase.config')
require('./config/routes.config')(app);



// var fs = require('fs');
// var multer = require('multer'); // v1.0.5
// var upload = multer({ dest: 'uploads/'})
// var cpUpload = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'gallery', maxCount: 12 }])

// app.post('/testFormData', cpUpload, function(req, res) {

//     console.log('req.body', req.body);
//     console.log('req.files', req.files);
//     // fs.writeFile(__dirname + "/upload/out.png", base64Data, 'base64', function(err) {
//     //     if (err) console.log(err);
//     //     fs.readFile(__dirname + "/upload/out.png", function(err, data) {
//     //         if (err) throw err;
//     //         console.log('reading file...', data.toString('base64'));
//             // res.send(data);
//     //     });
//     // });
//     res.json({success:1, data:req.files})
// });

/* 
require multer and all in the event.routes.js
create config/uploadFiles.config
//send the upload obj like i send the app and use it in event.routes.js
spamoff project
*/


//-------------------------------------
//// Configure server host+port
app.listen(port, function() {
	publicIp.v4().then(ip => {
	    console.log('Our app is running on:\thttp://'+os.hostname()+':'+ port+' | http://'+ip+':'+port);
	},err=>{
		console.log('cant get server external-ip',err)
	});
    
});