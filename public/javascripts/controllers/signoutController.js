/**
 * Created by Hamid on 1/6/2016.
 */
myApp.controller("signoutController", function ($scope, $rootScope, $location) {
    $rootScope.user = {
        token: null,
        username: null
    };
    $location.path('/movie/nowplaying');
});
