/**
 * Created by Rajeev on 12/16/15.
 */
var myApp = angular.module("movieApp", ['ngRoute']);
myApp.controller("MovieController",function($scope, $http, $location,$route){

    $scope.pageCount = 1;
    $scope.totalPage = 0;
    $scope.currentPage= null;
    //$scope.baseUrl= $location.absUrl().split('/');

    var baseurl = $location.absUrl().split('/');
    $scope.currentPage = $scope.baseUrl = baseurl[baseurl.length - 1]
    var srch = false;
    var type = null;

    $scope.reloadPage= function(){
        $route.reload();
    };

    $scope.search = function(){
        if (!srch ){
            srch = true;
            $scope.pageCount = 1;
        }
        type= 'search';

        $http.get("http://api.themoviedb.org/3/search/movie?api_key="+api_key+"&page="+ $scope.pageCount+"&query="+ document.getElementById('searchTxt').value)
            .success(function(response) {
                $scope.movieList = response.results;
                $scope.totalPage = response.total_pages;
            });
    };

    $scope.nowPlaying = function(){
        $http.get("http://api.themoviedb.org/3/movie/now_playing?api_key="+api_key+"&page="+ $scope.pageCount)
            .success(function(response) {
                $scope.movieList = response.results;
                $scope.totalPage = response.total_pages;

            });
    };

    $scope.upcoming = function(){
        $http.get("http://api.themoviedb.org/3/movie/upcoming?api_key="+api_key+"&page="+ $scope.pageCount)
            .success(function(response) {
                $scope.movieList = response.results;
                $scope.totalPage = response.total_pages;
            });
    };

    $scope.popular = function(){
        $http.get("http://api.themoviedb.org/3/movie/popular?api_key=fb5875eace5a99021e9a7dc4728b1a6b&page="+ $scope.pageCount)
            .success(function(response) {
                $scope.movieList = response.results;
                $scope.totalPage = response.total_pages;
            });
    };

    $scope.nextPage = function(){
        if($scope.pageCount<$scope.totalPage){
            $scope.pageCount++;
            invokeMovieList();
        }
    };

    $scope.previousPage = function() {
        if ($scope.pageCount > 0) {
            $scope.pageCount--;
            invokeMovieList();
        }
    };

    invokeMovieList();
    function invokeMovieList() {
        if (type=='search')
            $scope.currentPage = 'search';
        switch ($scope.currentPage) {
            case "upcoming":
                $scope.upcoming();
                break;
            case "nowplaying":
                $scope.nowPlaying();
                break;
            case "popular":
                $scope.popular();
                break;
            case "search":
                $scope.search();
                break;
        }
    }

});


