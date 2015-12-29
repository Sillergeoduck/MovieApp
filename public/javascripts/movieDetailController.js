myApp.controller("movieDetailController",function($scope, $rootScope, $http, $location,$route,$uibModal){

    $scope.otherMovies = [];
    //console.log($rootScope.movieList);
    //console.log($rootScope.movieId);
    $http.get("//api.themoviedb.org/3/movie/"+$rootScope.movieId+"?api_key="+api_key+"&append_to_response=credits")
        .success(function(response) {
            $scope.movie = response;
            $scope.movieCast = response.credits.cast;
        });

    $http.get("/reviews/review/"+$rootScope.movieId)
        .success(function(response) {
            $rootScope.reviewsList = response;
        });
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var indexes = [];
    while($scope.otherMovies.length<4){
        var idx= getRandomInt(0, 19);
        if ($rootScope.movieList[idx].poster_path !== null && indexes.indexOf(idx)==-1 && $rootScope.movieList[idx].id != $rootScope.movieId){
            $scope.otherMovies.push($rootScope.movieList[idx]);
            indexes.push(idx);
        }
    }

    $scope.showDetail= function(event){
        $rootScope.movieId = event.target.getAttribute('data-id');
        $route.reload();
    };

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'modalController',
            size: size,
            resolve: {
                items: function () {
                    return $scope.movieId;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

});

