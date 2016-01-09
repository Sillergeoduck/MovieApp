/**
 * Created by Hamid on 1/6/2016.
 */
myApp.controller("userController", function ($scope, $rootScope, $http, $crypto, $location, showAlertSrvc, AppConstant) {
        $scope.register = {
            email: '',
            name: '',
            password: ''
        };
        $scope.login = {
            email: '',
            password: ''
        };
        $scope.message = showAlertSrvc(1, false, '', AppConstant.messageType.danger);
        $scope.userRegister = function (isValid) {
            console.log('form is submitted.');
            $scope.required = true;
            // check to make sure the form is completely valid
            if (isValid) {
                console.log('our form is amazing');
                $scope.register = {
                    email: document.getElementById('reg-email').value,
                    name: document.getElementById('reg-username').value,
                    password: $crypto.encrypt(document.getElementById('reg-password').value)
                };
                $http.post("/users/register", $scope.register)
                    .success(function (result) {
                        $scope.message = showAlertSrvc(4000, false,'Registration was successful! ',AppConstant.messageType.success);

                    }).error(function (err) {
                        console.log('error => ' + err);
                        $scope.message = showAlertSrvc(4000, false,'There is an issue on registration. Try again! ',AppConstant.messageType.danger);

                });
            }
        };
        $scope.userLogin = function () {
            $scope.login = {
                email: document.getElementById('login-email').value
            };
            $http.post("/api/authenticate", $scope.login)
                .success(function (result) {
                    if (result.success) {
                        var password = $crypto.encrypt(document.getElementById('login-password').value);
                        if ($crypto.decrypt(password) === $crypto.decrypt(result.password)) {
                            $http.post("/api/authenticate/token", {})
                                .success(function (data) {
                                    $rootScope.user = {
                                        token: data.token,
                                        username: data.username
                                    };
                                    $location.path('/movie/nowplaying');
                                }).error(function (err) {
                                console.log('error => ' + err);
                            });

                        } else {
                            $scope.message = showAlertSrvc(4000, false,'Username or Password is wrong. Try again! ', AppConstant.messageType.danger);
                        }
                    } else {
                        $scope.message = showAlertSrvc(4000, false,result.message, AppConstant.messageType.danger);
                    }
                }).error(function (err) {
                console.log('error => ' + err);
            });
        };
    })
    .config(['$cryptoProvider', function ($cryptoProvider) {
        $cryptoProvider.setCryptographyKey('ABCD123');
    }]);