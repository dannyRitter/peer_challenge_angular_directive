/**
 * Created by Danny on 11/11/15.
 */
var myApp = angular.module("myApp", []);

myApp.controller('WelcomeController', ["$scope", "$http", "$filter", function($scope, $http, $filter){
    $scope.info = {};
    $scope.peopleArray = [];

    var orderBy = $filter('orderBy');

    //POST
    $scope.clickSubmit = function(data){
        $http.post('/data', data).then(function(response){
            $scope.info = {};
            $scope.getPeople();
        });
    };


    //GET
    $scope.getPeople = function(){
        $http.get('/data').then(function(response){
            $scope.peopleArray = response.data;
        });
    };

    $scope.getPeople();

    $scope.order = function(predicate, reverse) {
        $scope.peopleArray = orderBy($scope.peopleArray, predicate, reverse);
    };

    //VALIDATION
    $scope.submitForm = function() {

        // check to make sure the form is completely valid
        if ($scope.userForm.$valid) {
            alert('Well done human');
        }

    };

    //DELETE
    $scope.deletePerson = function(info) {
        console.log($scope.peopleArray);
        $http.delete('/data', {params: {id: info.param}}).then(function(response){
            $scope.getPeople();
            $scope.order('_id', false);
        });
    };
}]);