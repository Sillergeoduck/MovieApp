/**
 * Created by Rajeev on 12/17/15.
 */
//var myApp = angular.module("movieApp", ['ngRoute']);
myApp.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/movieList',{
            templateUrl: '/MovieList.ejs',
        controller: 'MovieController'
    }).when('/upcoming',{
        templateUrl: '/MovieList.ejs',
        controller: 'MovieController'
    }).
    otherwise({
        redirectTo: 'ANTMAN'
    })
}]);

