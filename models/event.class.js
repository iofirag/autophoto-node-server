//'use strict'
console.log('import event.class')
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

/* Book-Genre Schema */
exports.Event = class {
  	constructor(newEventParams) {
  		this.createdAt = 		Date.now()
	    this.createdBy = 		newEventParams.createdBy || ''
		this.location = 		newEventParams.location || ''
		this.title = 			newEventParams.title || ''
		this.description = 		newEventParams.description || ''
		this.coverPictureUrl = 	newEventParams.coverPictureUrl || 'http://www.aal-europe.eu/wp-content/uploads/2013/12/events_medium.jpg'
		this.galleryId = 		newEventParams.galleryId || ''
		this.groupId = 			newEventParams.groupId || ''
  	}
};