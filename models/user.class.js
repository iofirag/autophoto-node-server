//'use strict'
console.log('import user.class')

/* User Schema */
exports.User = class {
  	constructor(params) {
	    this.email = params.email || ''
		this.displayName = params.displayName || ''
		this.familyName = params.familyName || ''
		this.givenName = params.givenName || ''
		this.imageUrl = params.imageUrl || ''
		this.role = params.role || ''
		// Owner data
		this.ownerData = new OwnerData(params.ownerData)
  	}
}

let OwnerData = class {
	constructor(ownerDataParams){
		
		this.owner = ownerDataParams.owner || 'autophoto'

		switch (this.owner){
			case 'google':
				this.userId = ownerDataParams.userId || ''
				this.idToken = ownerDataParams.idToken || ''
				this.serverAuthCode = ownerDataParams.serverAuthCode || ''
				break;
			case 'autophoto':
				break;
		}
	}
}