'use strict';

var app = angular.module('myApp', [
    'ui.router',
    'ngAria',
    'pascalprecht.translate',
    'ngMessages',
    'ui.bootstrap',
    'ngSanitize',
    'templates-app',
    'templates-views'
]);

    app.config(['$locationProvider','$translateProvider', '$urlRouterProvider', '$stateProvider',
        function ($locationProvider, $translateProvider, $urlRouterProvider, $stateProvider) {

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

        //Needed this to remove the # in the urls
        $locationProvider.html5Mode(true);

        // translate provider config
        $translateProvider.useStaticFilesLoader({
            prefix: "src/assets/i18n/locale-",
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
