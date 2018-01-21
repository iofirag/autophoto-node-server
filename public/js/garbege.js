// Autophoto
			// -by key
			try{
				if (find.indexOf('-')==0){
					var eventsRef_keyFind = $rootScope.vars.database.ref('events/'+find)
					eventsRef_keyFind.once('value', function(snapshot) {
						var albumList = snapshot.val();
						if (!albumList) {
							// $scope.found = 'not_found';
							console.log( 'key "'+$rootScope.vars.searchString+'" not exist');	
							// $scope.notFoundSearchString = $rootScope.vars.searchString;
							// $rootScope.vars.searchString = '';
							// $scope.$apply();
						} else {
							// $scope.found = 'found';
							// $scope.$apply();
							console.log('key found = ',albumList)
							
							// add every object included at the result in the reslultList obj
							if (!$rootScope.vars.resultList.hasOwnProperty(snapshot.key)){
								$rootScope.vars.resultList[ snapshot.key ] = snapshot.val()
							}
							// $localStorage.searchString = $rootScope.vars.searchString;
							// $state.go('slideshow');
						} 
					})
				}
			}catch(ex){
				console.log( 'key "'+$rootScope.vars.searchString+'" not exist');
			}
			
			// -by value
			var eventsRef = $rootScope.vars.database.ref('events')
			// Search by Description
			var eventsRef_descFind = eventsRef.orderByChild('description').equalTo(find);
			eventsRef_descFind.once('value', function(snapshot) {
				var albumList = snapshot.val();
				if (!albumList) {
					// $scope.found = 'not_found';
					console.log( 'description "'+$rootScope.vars.searchString+'" not found');	
					// $scope.notFoundSearchString = $rootScope.vars.searchString;
					// $rootScope.vars.searchString = '';
					// $scope.$apply();
				} else {
					// $scope.found = 'found';
					// $scope.$apply();
					console.log('description found = ',albumList)
					var resKeys = Object.keys(albumList)
					for (var i in resKeys){
						// add every object included at the result in the reslultList obj
						if (!$rootScope.vars.resultList.hasOwnProperty(resKeys[i])){
							$rootScope.vars.resultList[ resKeys[i] ] = albumList[ resKeys[i] ];
							// console.log('resKeys')
							// console.log(albumList[ resKeys[i] ])
						}
					}
					// $localStorage.searchString = $rootScope.vars.searchString;
					// $state.go('slideshow');
				} 
			});
			// Search by Title
			var eventsRef_titleFind = eventsRef.orderByChild('title').equalTo(find);
			eventsRef_titleFind.once('value', function(snapshot) {
				var albumList = snapshot.val();
				if (!albumList) {
					// $scope.found = 'not_found';
					console.log( 'key "'+$rootScope.vars.searchString+'" not found');	
					// $scope.notFoundSearchString = $rootScope.vars.searchString;
					// $rootScope.vars.searchString = '';
					// $scope.$apply();
				} else {
					// $scope.found = 'found';
					// $scope.$apply();
					console.log('title found = ',albumList)
					var resKeys = Object.keys(snapshot.val())
					for (var i in resKeys){
						// add every object included at the result in the reslultList obj
						if (!$rootScope.vars.resultList.hasOwnProperty(resKeys[i])){
							$rootScope.vars.resultList[ resKeys[i] ] = albumList[ resKeys[i] ];
						}
					}
					// $localStorage.searchString = $rootScope.vars.searchString;
					// $state.go('slideshow');
				} 
			});











// Client-side way 	// Online-slide-show
			// var picturesRef = $rootScope.vars.database.ref(find)

			// picturesRef.once('value', function(snapshot) {
			// 	if (!snapshot.val()) {
			// 		$scope.found = 'not_found';
			// 		console.log( 'key "'+$rootScope.vars.searchString+'" not exist');	
			// 		$scope.notFoundSearchString = $rootScope.vars.searchString;
			// 		$rootScope.vars.searchString = '';
			// 		$scope.$apply();
			// 	} else {
			// 		$scope.found = 'found';
			// 		$scope.$apply();
			// 		console.log('exist')
			// 		console.log(snapshot.val())
			// 		$localStorage.searchString = $rootScope.vars.searchString;
			// 		$state.go('slideshow');
			// 	} 
			// })
			










// console.log($scope.resultList)

			// privateTodosRef.once('value', function(snapshot) {
			// 		if (!snapshot.val()) {
			// 			// $scope.found = 'not_found';
			// 			console.log( 'value "'+$rootScope.vars.searchString+'" not exist');	
			// 			// $scope.notFoundSearchString = $rootScope.vars.searchString;
			// 			// $rootScope.vars.searchString = '';
			// 			// $scope.$apply();
			// 		} else {
			// 			// $scope.found = 'found';
			// 			// $scope.$apply();
			// 			console.log('value exist')
			// 			console.log(snapshot.val())
			// 			// $localStorage.searchString = $rootScope.vars.searchString;
			// 			// $state.go('slideshow');
			// 		} 
			// })

			// W.S way
			// var data = {
			// 	searchString : find
			// }
			// $http.post('/searchAlbumByNameOrId', data, config).then(successCallback, errorCallback);