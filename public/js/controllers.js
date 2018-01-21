var app = angular.module('slideshowApp.controllers', ['ngStorage'])

app.controller('searchCtrl', ['$scope', '$http','$rootScope','$state','$localStorage','myService',
	function($scope, $http, $rootScope, $state, $localStorage,myService) {
		
		// $rootScope.vars = {
		// 	// database : myService.db,
		// 	searchString : '',
		// 	//picturesRef : '',
		// 	resultList : {}
		// }

		

		//$scope.found = 'wait'
		$scope.runScript = (e)=>{
			// $scope.found = 'wait';
		    //$scope.notFoundSearchString = '';
		    if (e.keyCode == 13) {
		    	$scope.search()
		        return false;
		    }
		}
		$scope.search = ()=>{
			console.log('search='+ $scope.searchString);
			if (!$scope.searchString) return;

			// $rootScope.vars.resultList = {};
			
			// Autophoto
			// -by key
			try{
				// ID
				if ($scope.searchString.indexOf('-')==0){
					console.log('searchString=',$scope.searchString)

					// Get Event By id
					var eventsRef_keyFind = myService.db.ref('events/'+$scope.searchString)
					eventsRef_keyFind.once('value', function(snapshot) {
						var eventData = snapshot.val();
						if (!eventData) {
							// not found
							$scope.found = 'not_found'
							$scope.msg = 'Event ID: "'+$scope.searchString+'" not found'
							//$scope.$apply()
						} else {
							console.log('eventData',eventData)
							// let galleryId = eventData.galleryId
							// var galleryRef = $rootScope.vars.database.ref('galleries/'+galleryId)
							// galleryRef.once('value', function(gallerySnapshot) {
							// 	var galleryData = gallerySnapshot.val();
							// 	if (!galleryData) {
							// 		// not found
							// 		$scope.found = 'not_found'
							// 		$scope.msg = 'Event ID: "'+find+'" not found'
							// 		$scope.$apply()
							// 	} else {
							// 		$scope.found = 'found'
							// 		$scope.$apply()

							// 		// add every object included at the result in the reslultList obj
							// 		if (!$rootScope.vars.resultList.hasOwnProperty(gallerySnapshot.key)){
							// 			console.log(galleryData)
							// 			$rootScope.vars.resultList[ gallerySnapshot.key ] = galleryData
							// 			$localStorage.searchString = gallerySnapshot.key
							// 		}
									$state.go('slideshow', {galleryId: eventData.galleryId});//send eventData.galleryId
							// 	}
							// }, err=>{
							// 	console.log('galleryRef err',err)
							// })
						} 
					}, err=>{
						console.log('eventsRef_keyFind error',err)
					})
				}
			}catch(ex){
				// id not valid
				$scope.found = 'not_found'
				$scope.msg = '"'+find+'" not a valid ID'
				// $scope.$apply()
			}
			
			// // -by value
			// var eventsRef = $rootScope.vars.database.ref('events')
			// // Search by Description
			// var eventsRef_descFind = eventsRef.orderByChild('description').equalTo(find);
			// eventsRef_descFind.once('value', function(snapshot) {
			// 	var albumList = snapshot.val();
			// 	if (!albumList) {
			// 		// not found
			// 		$scope.found = 'not_found'
			// 		$scope.msg = '"'+find+'" not found'
			// 		$scope.$apply()
			// 	} else {
			// 		$scope.found = 'found'
			// 		$scope.$apply()

			// 		var resKeys = Object.keys(albumList)
			// 		for (var i in resKeys){
			// 			// add every object included at the result in the reslultList obj
			// 			if (!$rootScope.vars.resultList.hasOwnProperty(resKeys[i])){
			// 				$rootScope.vars.resultList[ resKeys[i] ] = albumList[ resKeys[i] ];
			// 			}
			// 		}
			// 	} 
			// });
			// // Search by Title
			// var eventsRef_titleFind = eventsRef.orderByChild('title').equalTo(find);
			// eventsRef_titleFind.once('value', function(snapshot) {
			// 	var albumList = snapshot.val();
			// 	if (!albumList) {
			// 		// not found
			// 		$scope.found = 'not_found'
			// 		$scope.msg = '"'+find+'" not found'
			// 		$scope.$apply()
			// 	} else {
			// 		$scope.found = 'found'
			// 		$scope.$apply()

			// 		var resKeys = Object.keys(snapshot.val())
			// 		for (var i in resKeys){
			// 			// add every object included at the result in the reslultList obj
			// 			if (!$rootScope.vars.resultList.hasOwnProperty(resKeys[i])){
			// 				$rootScope.vars.resultList[ resKeys[i] ] = albumList[ resKeys[i] ];
			// 			}
			// 		}
			// 	} 
			// });
		}
	}
])
// app.controller('resultsCtrl', ['$scope','$http','$rootScope','$localStorage','myService',
// 	function($scope, $interval, $http, $rootScope, $localStorage,myService) {
// }])
app.controller('slideshowCtrl', ['$scope','$interval','$http','$rootScope','$localStorage','myService','$state','$stateParams',
	function($scope, $interval, $http, $rootScope, $localStorage,myService, $state, $stateParams) {
		
		$scope.loading = true;
		$scope.currImg = {
			key : '',
			url : ''
		}
		// $scope.currImgIndex = 'not_init';
		//$scope.pictureKeysList = [];
		$scope.picturesMap = {};
		var stop;

		$scope.init = ()=>{
			
			
			// debugger;

			if (!$stateParams.galleryId){
				return $state.go('search')
			}

			console.log('$stateParams.galleryId',$stateParams.galleryId)
			// if (!$localStorage.searchString){
			// 	return $state.go('search');
			// }
			// console.log('$localStorage.searchString=',$localStorage.searchString)
			
			// if (!$rootScope.vars){
			// 	console.log('$rootScope.vars is empty. recover params from $localStorage')
			// 	$rootScope.vars = {
			// 		database : myService.db,
			// 		searchString : $localStorage.searchString
			// 	}
			// }
			// console.log('$rootScope.vars=',$rootScope.vars)

			// $scope.loading = true;
			// console.log('$rootScope.vars.searchString='+$rootScope.vars.searchString)
			var galleryRef = myService.db.ref('galleries/'+$stateParams.galleryId);
			
			// Init all the pictures url and text.
			//galleryRef.once('value', function(snapshot) {
				// debugger
				//if (!snapshot.val()) return 'key "'+$stateParams.galleryId+'" not exist'

				// var galleryData = snapshot.val();
				//$scope.picturesMap = snapshot.val()
				// debugger
				// console.log('$scope.picturesMap=',$scope.picturesMap)
				//if ( Object.keys($scope.picturesMap).length){
					//$scope.startSlideShow();
			$scope.initListeners(galleryRef)
					//console.log('id valid')
				//}
				//console.log('$scope.loading='+$scope.loading)
			// });
		}

		$scope.initListeners = (galleryRef) =>{
			galleryRef.on('child_added', function(data) {// On-child added
				debugger
				if ( data.key.indexOf('-')!=0 ) return;

				// Valid image
				// if (Object.keys($scope.picturesMap).length==0){
				// 	// First image
				// 	$scope.loading = false
				// 	$scope.startSlideShow();
				// }
				if (data.key in $scope.picturesMap) return	// exist image
				else{
					// Add new picture data in map
					$scope.picturesMap[data.key] = data.val();
					console.log('child has added='+data.key)
					// $scope.$apply()
					if ( Object.keys($scope.picturesMap).length==1){
						// When first picture in gallery
						$scope.startSlideShow();
					}
				}	
			});

			galleryRef.on('child_changed', function(data) {	// On child changed
				// Change this data in map by the exist key // maybe check for exist key for safe
				debugger;
				if (data.key=='pictures'){
					$scope.picturesMap = data.val();
				}
				// else{
				// 	$scope.picturesMap[data.key] = data.val();
				// }
				console.log('child_Changed', data.val() );
				debugger
			});
			galleryRef.on('child_removed', function(dataDel) {	// On-child removed
				debugger;			
				if ( data.key.indexOf('-') != 0 ) return;

				//check if this is current image AND there is more picture
				// Detect if it's current show
				if ($scope.currImg.key == dataDel.key){
					// Change picture
					$scope.stopSlideShow();
					// $scope.intervalFunction();
					$scope.startSlideShow();
				}else{
					// delete another img
				}
				// Remove deleted pic key from map
				delete $scope.picturesMap[dataDel.key];
			});
		}

		$scope.startSlideShow = ()=>{
			// Don't start a new fight if we are already fighting
          	if ( angular.isDefined(stop) ) return;

			// Remove loading image
			$scope.loading = false
			// debugger;
			// Start the interval to show
			if (Object.keys($scope.picturesMap).length >0){
				$scope.intervalFunction()
				stop = $interval(()=>{
					$scope.intervalFunction();
				}, 10000);
			}
		}
		$scope.stopSlideShow = ()=>{
			if (angular.isDefined(stop)) {
	        	$interval.cancel(stop);
	        	stop = undefined;
	        }
		}
		$scope.intervalFunction = ()=>{
			$scope.getNextIndexToShow();
			var imgDataToShow = $scope.picturesMap[ $scope.currImg.key ];
			$scope.currImg.url = imgDataToShow.secure_url;
			// console.log('$scope.currImg.url='+$scope.currImg.url)
		}
		$scope.getNextIndexToShow = ()=>{
			// debugger
			var pictureKeysList = Object.keys($scope.picturesMap)
			var currIndex = Object.keys($scope.picturesMap).indexOf($scope.currImg.key)

			if(currIndex >= 0 && currIndex+1 < pictureKeysList.length){
				// Get next key
				$scope.currImg.key = Object.keys($scope.picturesMap)[currIndex+1];
			}else{
				// Start from the beginning
				$scope.currImg.key = Object.keys($scope.picturesMap)[0];
			}
		}
		$scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $scope.stopSlideShow();
        });

		// $scope.initArrayPrototype = ()=>{
		// 	Array.prototype.indexOf || (Array.prototype.indexOf = function(d, e) {
		// 	    var a;
		// 	    if (null == this) throw new TypeError('"this" is null or not defined');
		// 	    var c = Object(this),
		// 	        b = c.length >>> 0;
		// 	    if (0 === b) return -1;
		// 	    a = +e || 0;
		// 	    Infinity === Math.abs(a) && (a = 0);
		// 	    if (a >= b) return -1;
		// 	    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
		// 	        if (a in c && c[a] === d) return a;
		// 	        a++
		// 	    }
		// 	    return -1
		// 	});
		// }
}])