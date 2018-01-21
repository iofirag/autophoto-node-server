console.log('import event.controller')

var Group = require('../models/group.class').Group
var Gallery = require('../models/gallery.class').Gallery
var Event = require('../models/event.class').Event
var db = require("../config/firebase.config").db


exports.getAllEvents = (req,res)=>{
	console.log('getAllEvents() executed')
	var eventsRef = db.ref('/events');
	eventsRef.once('value', (snapshot)=>{
	    	if (snapshot.val()) {
	    		return res.json({success:1, data:snapshot.val()})
			} else {
		      	return res.json({success:0,description:'Currently there is not events'})
			}
		});
}
exports.getEventById = (req,res)=>{
	console.log('getEventById() executed',req.params)
	if(req.params && req.params.id) {
		var eventsRef = db.ref('/events/'+req.params.id);
			eventsRef.once('value', (snapshot)=>{
	    	if (snapshot.val()) {
	    		let eventObj = snapshot.val()
	    		eventObj.firebaseEventId = snapshot.key
	    		return res.json({success:1, description:'EVENT_FOUND', data:eventObj})
			} else {
		      	return res.json({success:0,description:'There is not event id like: '+req.params.id})
			}
		});
	}else{
		return res.json({errCode: 'EVENT_SEARCHING_FAIL', description:'Found event fail, provide id field', success:0})
	}
}

/*****************************************************************
@params:

newEvent: {				object
	createdBy: 			String
	location: {			object
		long: 
		lat:
	}
	title: 				string
	description: 		string
	coverPictureUrl: 	string
}
**************************/
exports.createEvent = (req,res)=>{
	console.log('createEvent() executed',req.body)

	if(req.body && req.body.newEvent) {
		
		// Create Gallery
		var newGalleryParams = {
			// currently there is no gallery params to send
		}
		var newGallery = new Gallery(newGalleryParams);
		var galleriesRef = db.ref('/galleries');
		var newGalleryNode = galleriesRef.push()
		newGalleryNode.set(newGallery);


		// Create Group
		var newGroupParams = {
			// currently there is no group params to send
		}
		var newGroup = new Group(newGroupParams);
		newGroup[req.body.newEvent.createdBy] = 1	// Add creator automatically to group by the userId
		var groupsRef = db.ref('/groups');
		var newGroupNode = groupsRef.push()
		newGroupNode.set(newGroup);


		// Create event
		var newEventParams = req.body.newEvent 		// get all event data from request
		newEventParams.galleryId = newGalleryNode.key	// connect event with it's gallery
		newEventParams.groupId = newGroupNode.key // connect event with it's group
		var newEvent = new Event(newEventParams);
		var eventsRef = db.ref('/events');
		var newEventNode = eventsRef.push()
		newEventNode.set(newEvent);
		newEvent.firebaseEventId = newEventNode.key
		
		return res.json({description:'NEW_EVENT', data:newEvent, success:1})
	}else{
		return res.json({errCode: 'EVENT_CREATION_FAIL', description:'Created event fail, provide newEvent field', success:0})
	}
}


