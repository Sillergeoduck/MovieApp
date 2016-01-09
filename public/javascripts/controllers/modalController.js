/**
 * Created by Hamid on 12/27/2015.
 */
myApp.controller('modalController', function ($rootScope, $scope, $uibModalInstance, items, $http) {

    $scope.items = items;
    console.log($scope.items);
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        console.log('i am in modal form ....!');
        var data = {};
        data.username = $rootScope.user.username; // document.getElementById('username').value;
        data.review = document.getElementById('reviewText').value;
        data.register = new Date().toLocaleDateString("en-US");
        data.movieId = $scope.items;
        data.token = $rootScope.user.token;
        $http.post("/reviews/review", data)
            .success(function(result) {
                $rootScope.reviewsList.unshift(data);

            }).error (function (err) {
                 console.log( err);
        });
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});