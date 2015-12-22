/**
 * Created by Rajeev on 12/16/15.
 */
myApp.controller("SearchController",function($scope, $http, $location){

    $scope.pageCount = 1;
    $scope.totalPage = 0;
    $scope.currentPage= null;

    $scope.search = function(){
        console.log('i am a search...');
        $http.get("http://api.themoviedb.org/3/search/movie?api_key=fb5875eace5a99021e9a7dc4728b1a6b&page="+ $scope.pageCount+"&query="+ $scope.searchTxt)
            .success(function(response) {
                $scope.movieList = response.results;
                $scope.totalPage = response.total_pages;
                console.log(response.results);
                //console.log(document.getElementById('searchTxt').value);
                console.log($scope.searchTxt);
            });
        //$scope.movies = data.results;
    }

    $scope.nextPage = function(){
        console.log($scope.totalPage);
        if($scope.pageCount<$scope.totalPage){
            $scope.pageCount++;
            console.log($scope.pageCount);
            invokeMovieList();
        }
    }

    $scope.previousPage = function() {
        console.log($scope.totalPage);
        if ($scope.pageCount > 0) {
            $scope.pageCount--;
            console.log($scope.pageCount);
            invokeMovieList();
        }
    }

    invokeMovieList();
    function invokeMovieList() {
        console.log($location.absUrl());
        var baseurl = $location.absUrl().split('/');
        console.log(baseurl);
        $scope.currentPage = baseurl[baseurl.length - 1];

        switch ($scope.currentPage) {
            case "search":
                $scope.search();
                break;
        }
    }

});


