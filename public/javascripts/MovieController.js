/**
 * Created by Rajeev on 12/16/15.
 */
var myApp = angular.module("movieApp", ['ngRoute']);
myApp.controller("MovieController",function($scope, $rootScope, $http, $location,$route){

    $scope.pageCount = 1;
    $scope.totalPage = 0;
    $scope.currentPage= null;

    var baseurl = $location.absUrl().split('/');
    $scope.currentPage = $scope.baseUrl = baseurl[baseurl.length - 1];
    var srch = false;
    var type = null;

    $scope.reloadPage= function(){
        $route.reload();
    };

    $scope.signIn = function(){
        console.log('Hi Welcome to 21st Century cinemas');
    }

    $scope.showDetail= function(event){

        console.log(event.target.getAttribute('data-id'));
        $rootScope.movieList = $scope.movieList;
        $rootScope.movieId = event.target.getAttribute('data-id');
        $location.path('/movie/movieDetails');

    }

    $scope.search = function(){
        if (!srch ){
            srch = true;
            $scope.pageCount = 1;
        }
        type= 'search';

        $http.get("//api.themoviedb.org/3/search/movie?api_key="+api_key+"&page="+ $scope.pageCount+"&query="+ document.getElementById('searchTxt').value)
            .success(function(response) {
                $scope.movieList = response.results;
                $scope.totalPage = 0 || response.total_pages;
            });
    };

    $scope.searchByEnter = function(keyEvent) {
        if (keyEvent.which === 13)
            $scope.search();
    };
    var movieList = function(movieFilter){
        $http.get("//api.themoviedb.org/3/movie/"+movieFilter+"?api_key="+api_key+"&page="+ $scope.pageCount)
            .success(function(response) {
                $scope.movieList = response.results;
                $scope.totalPage = 0 || response.total_pages;

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
                movieList("upcoming");
                break;
            case "nowplaying":
                movieList("now_playing");
                break;
            case "popular":
                movieList("popular");
                break;
            case "search":
                $scope.search();
                break;
        }
    }

});


