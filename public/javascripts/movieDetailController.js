myApp.controller("movieDetailController",function($scope, $rootScope, $http, $location,$route){

console.log($rootScope.movieList);
console.log($rootScope.movieId);
    for(var i = 0,len = $rootScope.movieList.length; i<len ;i++){
       if($rootScope.movieList[i].id == $rootScope.movieId) {
           $scope.movie = $rootScope.movieList[i];

           break;
       }

    }
});