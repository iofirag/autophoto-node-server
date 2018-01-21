console.log('import user.controller')
var User = require('../models/user.class').User
var db = require("../config/firebase.config").db

exports.getAllUsers = (req,res)=>{
	console.log('getAllUsers() executed')
	var usersRef = db.ref('/users');
	usersRef.once('value', (snapshot)=>{
	    	if (snapshot.val()) {
	    		return res.json({success:1, data:snapshot.val()})
			} else {
		      	return res.json({success:0,description:'Currently there is not users'})
			}
		});
}
exports.createUser = (req,res)=>{
	console.log('createUser() executed')
	if(req.body && req.body.newUser && req.body.newUser.email && req.body.newUser.ownerData.owner){
		console.log('createUser - checkForUniqueUserEmail',req.body)
		checkForUniqueUserEmail(req.body.newUser.email).then(
		(success)=>{
			console.log('success',success)
			let userParams = req.body.newUser
			userParams.role = 'standard';
			let newUser = new User(userParams);

			switch(userParams.ownerData.owner){
				case 'google':
					newUser.ownerData.userId = userParams.ownerData.userId;
					newUser.ownerData.idToken = userParams.ownerData.idToken;
					newUser.ownerData.serverAuthCode = userParams.ownerData.serverAuthCode;
					break;
				case 'autophoto':
					break;
			}
			var ref = db.ref('/users');
			//var usersRef = ref.child('users');
			var newUserNode = ref.push()	// child('<string>') - for specific name
			//console.log('newUserNode.key',newUserNode.key)
			newUserNode.set(newUser);
			newUser.firebaseId = newUserNode.key
			return res.json({description:'NEW_USER', data:newUser, success:1})
		},err=>{
			console.log('createUser() - exist user')
			return res.json({description: 'EXIST_USER', data:err, success:2})
		})
	}else{
		return res.json({errCode: 'USER_CREATION_FAIL', description:'Created user fail', success:0})
	}
}

var checkForUniqueUserEmail = (email) =>{
	console.log('checkForExistUserEmail() executed')
	return new Promise( (resolve,reject)=>{
		var usersRef = db.ref('/users')
		var usersQueryRef = usersRef.orderByChild('email').equalTo(email)
		usersQueryRef.once('value', (snapshot)=>{
	    	if (snapshot.val()) {
	    		let firebaseId = Object.keys(snapshot.val())[0]
	    		let existUser = snapshot.val()[firebaseId]
	    		existUser.firebaseId = firebaseId
	    		console.log('reject')
	    		reject(existUser)
			} else {
				console.log('relove')
		      	resolve('mail doesnt exist at any user')
			}
			console.log('check end')
		});
	})
}

exports.getNameByFbaseID = (req, res)=>{
	console.log('getNameByFbaseID() executed');

	console.log(req.body.fbaseID);

	if(req.body.fbaseID){
		var usersRef = db.ref(`/users/${req.body.fbaseID}`);
		usersRef.once('value', (snapshot)=>{
			console.log(snapshot.val().displayName);

			res.json({
				name: snapshot.val().displayName,
				success: 1
			});
		});
	}else{
		res.json({
			description: 'You not input the choosen fbaseID',
			success: -2
		});
	}
}

// exports.getUserIdByEmail = (req,res)=>{
// 	console.log('getUserIdByEmail() executed')
// 	if()
// }