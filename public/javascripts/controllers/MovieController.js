/**
 * Created by Rajeev on 12/16/15.
 */
var myApp = angular.module("movieApp", ['ngRoute','ngAnimate', 'ui.bootstrap', 'mdo-angular-cryptography']);
myApp.controller("MovieController",function($scope, $rootScope, $http, $location,$route, movieService){

    $scope.pageCount = 1;
    $scope.totalPage = 0;
    $scope.currentPage= null;
    $rootScope.user = {
        token: null,
        username: null
    };
    var baseurl = $location.absUrl().split('/');
    $scope.currentPage = $scope.baseUrl = baseurl[baseurl.length - 1];
    var srch = false;
    //$rootScope.typeAction = null;

    $scope.reloadPage= function(){
        $route.reload();
    };

    $scope.signIn = function(){
        console.log('Hi Welcome to 21st Century cinemas');
    };

    $scope.showDetail= function(event){
        $rootScope.movieList = $scope.movieList;
        $rootScope.movieId = event.target.getAttribute('data-id');
        $rootScope.searchTxt = null;
        $location.path('/movie/movieDetails');
    };

    $scope.search = function(){
        if (!srch ){
            srch = true;
            $scope.pageCount = 1;
        }
        $rootScope.typeAction  = 'search';
        $rootScope.searchTxt = document.getElementById('searchTxt').value;
        movieService.search($rootScope.searchTxt, $scope.pageCount).then(function (data) {
            $scope.movieList = data.results;
            $scope.totalPage = 0 || data.total_pages;
        }, function (error) {
            console.log(error);
            //$scope.message = showAlertSrvc(4000, false,'Username or Password is wrong. Try again! ', AppConstant.messageType.warning);
        });
    };

    $scope.searchByEnter = function(keyEvent) {
        if (keyEvent.which === 13)
            $scope.search();
        else
            srch = false;
    };

    var movieList = function(movieFilter){
        $http.get("//api.themoviedb.org/3/movie/"+movieFilter+"?api_key="+api_key+"&page="+ $scope.pageCount)
            .success(function(response) {
                $scope.movieList = response.results;
                $scope.totalPage = 0 || response.total_pages;
                srch = false;
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
        if ( $rootScope.typeAction == 'search')
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



