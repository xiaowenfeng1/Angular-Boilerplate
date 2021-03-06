'use strict';

var app = angular.module('myApp', [
    'ui.router',
    'ngAria',
    'pascalprecht.translate',
    'ngMessages',
    'ui.bootstrap',
    'ngSanitize',
    'ui.select',
    'templates-app',
    'templates-views'
]);

    app.config(['$locationProvider','$translateProvider', '$urlRouterProvider', '$stateProvider', '$ariaProvider',
        function ($locationProvider, $translateProvider, $urlRouterProvider, $stateProvider, $ariaProvider) {

        $urlRouterProvider.otherwise("/");
        //main views get populated here.
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "views/home.html"
            })
            .state('about', {
                url: "/about",
                templateUrl: "views/about.html"
            });

        // required to disable automatic append of role=button and tabindex=0
        $ariaProvider.config({
            bindRoleForClick: false,
            tabindex: false
        });

        //Needed this to remove the # in the urls
        $locationProvider.html5Mode(true);

        // translate provider config
        $translateProvider.useStaticFilesLoader({
            prefix: "assets/i18n/locale-",
            suffix: ".json"
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');
        $translateProvider.useSanitizeValueStrategy(null);
    }])

    .run( function run () {
    })

    .controller('MainController', function ($scope, $translate){
    /*
        $http.get('js/data.json').success(function (data) {
            $scope.data = data;
        });
        $scope.$storage = $localStorage;
        $scope.$sessionStorage = $sessionStorage;
        */
    });
