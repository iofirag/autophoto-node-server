console.log('import group.controller')

var Group = require('../models/group.class').Group
var db = require("../config/firebase.config").db

// Group
exports.getAllGroups = (req,res)=>{
	console.log('getAllGroups() executed')
	var groupsRef = db.ref('/groups');
	groupsRef.once('value', (snapshot)=>{
    	if (snapshot.val()) {
    		return res.json({success:1, data:snapshot.val()})
		} else {
	      	return res.json({success:0,description:'Currently there is not groups'})
		}
	});
}

exports.getGroupById = (req,res)=>{
	console.log('getGroupById() executed',req.params)
	if(req.params && req.params.id) {
		var groupRef = db.ref('/groups/'+req.params.id);
			groupRef.once('value', (snapshot)=>{
	    	if (snapshot.val()) {
	    		let groupObj = snapshot.val()
	    		//groupObj.firebaseGroupId = snapshot.key
	    		return res.json({success:1, description:'GROUP_FOUND', data:groupObj})
			} else {
		      	return res.json({success:0,description:'There is not group id like: '+req.params.id})
			}
		});
	}else{
		return res.json({errCode: 'GROUP_SEARCHING_FAIL', description:'group search fail, provide id field', success:0})
	}
}

exports.insertUserIdToGroup = (req,res)=>{
	console.log('insertUserIdToGroup() executed',req.body)

	if(req.body && req.body.groupId && req.body.userId) {
		// var newEvent = new Event(req.body.newEvent);
		var ref = db.ref('/groups/'+req.body.groupId);
		var newGroupNode = ref.child(req.body.userId)
		newGroupNode.set(1);
		// newEvent.firebaseEventId = newEventNode.key
		return res.json({description:'GROUP_JOINED', success:1})
	} else {
		return res.json({errCode: 'GROUP_JOIN_FAIL', description:'Join user ID to group fail, provide (groupId, userId) fields', success:0})
	}
}