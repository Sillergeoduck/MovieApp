/**
 * Created by hamidhoseini on 10/10/15.
 */
myApp.service('showAlertSrvc', ['$timeout', function($timeout) {
    return function(delay, value, message) {
        var result = {
            hidden:value,
            alertMessage: message
        };
        $timeout(function() {
            result.hidden=!value;
        }, delay);
        return result;
    };
}]);