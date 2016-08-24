'use strict';

var angular;

angular.module('myApp', [
    'ui.router',
    'ngStorage' ,
    'ngAria',
    'pascalprecht.translate'
])

    .config( function myAppConfig ($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider) {

        $compileProvider.debugInfoEnabled(false);
        $urlRouterProvider.otherwise("/home");
        //main views get populated here.
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: ""
            })
            .state('about', {
                url: "/about",
                templateUrl: ""
            });

        //Needed this to remove the # in the urls
        $locationProvider.html5Mode(true);
    })

    .run( function run () {
    })

    .controller('MainController', function ($scope, $http, $localStorage, $sessionStorage){
        $http.get('js/data.json').success(function (data) {
            $scope.data = data;
        });
        $scope.$storage = $localStorage;
        $scope.$sessionStorage = $sessionStorage;
    });