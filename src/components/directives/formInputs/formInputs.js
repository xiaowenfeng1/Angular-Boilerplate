app.directive('formInputs', function() {
    return {
        templateUrl: 'components/directives/formInputs/formInputs.tpl.html',
        restrict: 'E',
        controller: 'formInputsController'
    }
}).controller('formInputsController', function ($scope, $http) {

    $scope.country = {};

    $http.get('assets/data/country.json').success(function (data) {
        $scope.country.list = angular.fromJson(data);
    });

    $scope.clear = function () {
        $scope.form.dob = null;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(),
        startingDay: 1
    };

    $scope.openDatepicker = function () {
        $scope.popup.opened = true;
    };

    $scope.popup = {
        opened: false
    };

});