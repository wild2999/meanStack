var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function () {
        $http.get('/catalog').success(function(response) {
            console.log("I got the data I requested");
            $scope.catalog = response;
            $scope.catalogItem = "";
        });
    };

    refresh();

    $scope.addItem = function () {
        $http.post('/catalog', $scope.catalogItem).success(function (response) {
            refresh();
        });
    };

    $scope.remove = function (id) {
        console.log(id);
        $http.delete('/catalog/' + id).success(function(response) {
            refresh();
        });
    };

    $scope.edit = function (id) {
        console.log(id);
        $http.get('/catalog/' + id).success(function (response) {
            $scope.catalogItem = response;
        })
    };

    $scope.update = function () {
        console.log($scope.catalogItem._id);
        $http.put('/catalog/' + $scope.catalogItem._id, $scope.catalogItem).success(function (response) {
            refresh();
        })
    };

    $scope.deselect = function () {
        $scope.catalogItem = "";
    }

}]);