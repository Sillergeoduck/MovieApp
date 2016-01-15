/**
 * Created by Hamid on 1/13/2016.
 */
/**
 * Created by hamidhoseini on 10/3/15.
 */
myApp.factory('movieService', function ($http, $q) {
    return {
        search: function (txtSearch,pageCount) {
            return $q(function (resolve, reject) {
                $http.get("//api.themoviedb.org/3/search/movie?api_key="+api_key+"&page="+ pageCount+"&query="+ txtSearch)
                    .success(function (result) {
                        resolve(result);
                }).error (function (err) {
                    reject(err);
                });
            });
        }
    };
});