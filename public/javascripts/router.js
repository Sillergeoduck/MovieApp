/**
 * Created by Rajeev on 12/17/15.
 */
//var myApp = angular.module("movieApp", ['ngRoute']);
myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/movieList', {
        templateUrl: '/MovieList.ejs',
        controller: 'MovieController'
    }).when('/movie/nowplaying', {
        templateUrl: '/MovieList.ejs',
        controller: 'MovieController'
    }).when('/movie/upcoming', {
        templateUrl: '/MovieList.ejs',
        controller: 'MovieController'
    }).when('/movie/popular', {
        templateUrl: '/MovieList.ejs',
        controller: 'MovieController'
    }).when('/movie/movieDetails', {
        templateUrl: '/movieDetails.ejs',
        controller: 'movieDetailController'
    }).otherwise({
        redirectTo: 'ANTMAN'
    })
}]);