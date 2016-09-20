const angular = require('angular');
const ngRoute = require('angular-route');

/*Simple definition of controller to ensure no accidental typo*/
const App = angular.module('app', [ngRoute]);
const IndexCtrl = 'IndexCtrl';

/*All the routes used in this App*/
App.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      controller: IndexCtrl
    })

    .when('/:user', {
      templateUrl: 'templates/search.html',
      controller: IndexCtrl
    })

    .when('/:user/:index', {
      templateUrl: 'templates/readme.html',
      controller: IndexCtrl
    })
    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}])

/* Controller for ALL the routes */
App.controller(IndexCtrl, ['$scope', '$location', '$http', '$routeParams', '$rootScope', function($scope, $location, $http, $routeParams, $rootScope){

  $scope.user = $routeParams.user;
/*First $http for /:user route to get a list of repos*/
  $scope.callUser = function (user){
  const ROOT_URL = `https://api.github.com/search/repositories?q=user:${user}&sort=stars&order=desc`

  $http.get(ROOT_URL)
    .then(function(res){
      $location.path(`/${user}`);
      $rootScope.repositories = res.data.items;
    })
    .catch(function(err){
      window.alert("Something went wrong, please try another username!");
      $location.path("/");
      console.error(err)
    })
  }
/*To ensure the route params are consistant */
  $routeParams.index = $scope.$index + 1;

/*Second $http for /:user/:$index route to get a list of readme.md within the repo*/
  $scope.fetchRM = function(user, $index){
    const  {full_name} = $rootScope.repositories[$index];
    const RM_URL = `https://api.github.com/repos/${ full_name }/readme`
    $http.get(RM_URL)
    .then(function(res){
      $location.path(`/${user}/${$index + 1}`);
      console.log(res.data)
      console.log(res.data.download_url);
      $rootScope.content = res.data.download_url;


    })
    .catch(function(err){
      $location.path("/")
      window.alert("This repository does not have a README.md file, try another username instead?");
      console.error(err)
    })
  }






}]);
//
// Ctrl(ListCtrl, ['$scope', '$location', function($scope, $location){
//
// }])
//
// Ctrl(ReadCtrl, ['$scope', '$location', '$http', '$rootScope', '$routeParams', function($scope, $location, $http, $rootScope, $routeParams ){
//     $routeParams.full_name = $rootScope.repositories.full_name;
//     $scope.full_name = $ootScope.repositories.full_name;
//
//
// }])
