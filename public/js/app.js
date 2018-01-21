var app = angular.module('slideshowApp', [
                        'ui.router',
                        'slideshowApp.controllers',
                        'slideshowApp.services'
                        // 'slideshowApp.directives'
                        ])


.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    // .state('home', {
    //     abstract : true,
    //     url: '/home',
    //     template: '<ui-view/>'
    // })
    .state('search', {
        url: '/search',
        templateUrl: 'views/search.html',
        controller: 'searchCtrl'
    })
    // .state('results', {
    //     url: '/results',
    //     templateUrl: 'views/results.html',
    //     controller: 'resultsCtrl'
    // })
    // .state('results', {
    //     url: '/results',
    //     templateUrl: 'views/results.html',
    //     controller: 'resultsCtrl'
    // })
    .state('slideshow', {
        url: '/slideshow/:galleryId',
        templateUrl: 'views/slideshow.html',
        controller: 'slideshowCtrl'
    })

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('search')
})



.run(['$rootScope', '$state',
    function ($rootScope, $state) {
        // var config = {   // Online-slide-show
        //     apiKey: "AIzaSyDmReWWFJ9a0xY4T-ofnVGXJ08H_i1Iz7k",
        //     authDomain: "online-slideshow.firebaseapp.com",
        //     databaseURL: "https://online-slideshow.firebaseio.com",
        //     storageBucket: "online-slideshow.appspot.com",
        //     messagingSenderId: "427849476383"
        // };
        // var config = {
        //     apiKey: "AIzaSyC5BebIOada0g0YKpQQRGIqikX_VDDCyEg",
        //     authDomain: "autophoto-3e7d2.firebaseapp.com",
        //     databaseURL: "https://autophoto-3e7d2.firebaseio.com",
        //     projectId: "autophoto-3e7d2",
        //     storageBucket: "autophoto-3e7d2.appspot.com",
        //     messagingSenderId: "604150610506"
        // };
        // firebase.initializeApp(config);
//         $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

//             var publicStates = ['login'];
//             var isPublicStates = publicStates.indexOf(toState.name) > -1;
//             console.log('isPublicStates ='+isPublicStates)
//             console.log('isLoggedIn = '+authProvider.isLoggedIn())

//             // Redirect logged out user from list of restricted pages
//             if (!isPublicStates && !authProvider.isLoggedIn()) {
//               event.preventDefault();
//               return $state.go('login');
//             }
//             // Avoid logged in user nevigate to login page
//             if (toState.name == 'login' && authProvider.isLoggedIn()) { 
//               return event.preventDefault();
//             }
//         });
}])

