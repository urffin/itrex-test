angular.module('app',['ngRoute', 'dominos', 'grades'])
.config(['$routeProvider',
function config($routeProvider) {
  $routeProvider.
    when('/dominos', {
      template: '<dominos class="text-center d-block"></dominos>'
    }).
    when('/grades', {
      template: '<grades></grades>'
    }).
    otherwise('/dominos');
}
]);