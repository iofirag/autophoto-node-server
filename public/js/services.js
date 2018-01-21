var app = angular.module('slideshowApp.services', [])

app.factory('myService', function() {
 //    var config = {
	// 	apiKey: "AIzaSyDmReWWFJ9a0xY4T-ofnVGXJ08H_i1Iz7k",
	// 	authDomain: "online-slideshow.firebaseapp.com",
	// 	databaseURL: "https://online-slideshow.firebaseio.com",
	// 	storageBucket: "online-slideshow.appspot.com",
	// 	messagingSenderId: "427849476383"
	// };
	// firebase.initializeApp(config);
	// $scope.database = firebase.database();
	var config = {
        apiKey: "AIzaSyC5BebIOada0g0YKpQQRGIqikX_VDDCyEg",
        authDomain: "autophoto-3e7d2.firebaseapp.com",
        databaseURL: "https://autophoto-3e7d2.firebaseio.com",
        projectId: "autophoto-3e7d2",
        storageBucket: "autophoto-3e7d2.appspot.com",
        messagingSenderId: "604150610506"
    };
    firebase.initializeApp(config);
    let db = firebase.database()
    return {
     	db : db
     	//,
		// initFirebase : ()=>{
		// 	return firebase.database()
		// }
    };
});