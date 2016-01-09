/**
 * Created by hamidhoseini on 10/10/15.
 */
myApp.service('showAlertSrvc', ['$timeout', function($timeout) {
    return function(delay, value, message, type) {
        var result = {
            hidden:value,
            alertMessage: message,
            type: type
        };
        $timeout(function() {
            result.hidden=!value;
        }, delay);
        return result;
    };
}]);