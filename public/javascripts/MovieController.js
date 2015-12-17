/**
 * Created by Rajeev on 12/16/15.
 */
var myApp = angular.module("movieApp", ['ngRoute']);

myApp.controller("MovieController",function($scope, $http){

    $http.get("http://api.themoviedb.org/3/movie/now_playing?api_key=fb5875eace5a99021e9a7dc4728b1a6b")
        .success(function(response) {
            $scope.movieList = response.results;
            console.log(response.results);
        });
    //$scope.movies = data.results;


});


