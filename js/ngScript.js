var mainApp = angular.module('mainApp', ['ngRoute'])
    .config(function($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/index.html', {templateUrl:'/pages/00_main.html', controller: 'mainCtrl'})
            .when('/', {templateUrl:'/pages/00_main.html', controller: 'mainCtrl'})
            .when('/data', {templateUrl:'/pages/01_bigdata.html', controller: 'dataCtrl'})
            .when('/spectrum', {templateUrl:'/pages/02_spectrum.html', controller: 'specCtrl'})
            .when('/strength', {templateUrl:'/pages/03_strength.html', controller: 'strCtrl'})
            .when('/recommend', {templateUrl:'/pages/04_recommend.html', controller: 'recCtrl'})
            .when('/finder', {templateUrl:'/pages/05_aitFinder.html', controller: 'findCtrl'})
            .when('/port', {templateUrl:'/pages/06_aitPort.html', controller: 'portCtrl'})
            .when('/situation', {templateUrl:'/pages/07_situation.html', controller: 'sitCtrl'});
    });

mainApp.controller('homeCtrl', function($scope){
    $scope.testContent = 'home';
});

mainApp.controller('mainCtrl', function($scope){
    $scope.testContent = 'main';
});

mainApp.controller('dataCtrl', function($scope){
    $scope.testContent = 'data';
});

mainApp.controller('specCtrl', function($scope){
    $scope.testContent = 'spectrum';
});

mainApp.controller('strCtrl', function($scope){
    $scope.testContent = 'strength';
});

mainApp.controller('recCtrl', function($scope){
    $scope.testContent = 'recommend';
});

mainApp.controller('findCtrl', function($scope){
    $scope.testContent = 'ait find';
});

mainApp.controller('portCtrl', function($scope){
    $scope.testContent = 'ait port';
});

mainApp.controller('sitCtrl', function($scope){
    $scope.testContent = 'situation';
});