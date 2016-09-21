const angular = require('angular');
const ngRoute = require('angular-route');
const ngSanitize = require('angular-sanitize');
const markdown = require( "markdown" ).markdown;

/*Simple definition of controller to ensure no accidental typo*/
const App = angular.module('app', [ngRoute, ngSanitize]);
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
/*To ensure the route params for /:user/:index is consistant and logical*/
  $routeParams.index = $scope.$index + 1;

/*First $http for /:user route to get a list of repositories from specific username*/
  $scope.callUser = function (user){
  const ROOT_URL = `https://api.github.com/search/repositories?q=user:${user}&sort=stars&order=desc`

  $http.get(ROOT_URL)
    .then(function(res){
      if(res.status > 199 && res.status < 300 && !res.data.items[0]){
        $location.path("/")
        window.alert("User exist but no repositories has been created yet, please try another username!")
      }

      $location.path(`/${user}`);
      $rootScope.repositories = res.data.items;
    })
    .catch(function(err){
      window.alert("Something went wrong, please try another username!");
      $location.path("/");
      console.error(err)
    })
  }

/*Second $http for /:user/:index route to get readme.md within specific repository*/
  $scope.fetchRM = function(user, $index){
    $rootScope.name = $rootScope.repositories[$index].name;
    const  {full_name} = $rootScope.repositories[$index];
    const README_URL = `https://raw.githubusercontent.com/${full_name}/master/README.md`
    $http.get(README_URL)
    .then(function(res){
      $location.path(`/${user}/${$index + 1}`);
      $rootScope.content=markdown.toHTML(res.data);
    })
    .catch(function(err){
      $location.path("/")
      window.alert("This repository does not have a README.md file, try another username instead?");
      console.error(err)
    })
  }

}]);
