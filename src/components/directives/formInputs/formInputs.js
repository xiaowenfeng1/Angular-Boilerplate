app.directive('formInputs', function() {
    return {
        scope: {
            form: '=',
            data: '='
        },
        templateUrl: 'directives/formInputs/formInputs.html',
        restrict: 'E',
        controller: 'formInputsController'
    }
});