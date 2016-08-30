app.controller('modalController', function ($scope, $uibModalInstance) {

    // on "ok" button click, close the modal
    $scope.ok = function (result) {
        $uibModalInstance.close(result);
    };
   
});