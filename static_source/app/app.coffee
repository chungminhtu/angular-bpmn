
'use strict'

angular.module('templates', [])
angular.module('appFilters', [])
angular.module('appControllers', [])
angular.module('appServices', ['ngResource'])
app = angular
  .module('app', [
    'templates'
    'ngRoute'
    'appControllers'
    'appFilters'
    'appServices'
    'route-segment'
    'view-segment'
    'angular-bpmn'
  ])

angular.module('app')
  .config ['$routeProvider', '$locationProvider', '$routeSegmentProvider'
  ($routeProvider, $locationProvider, $routeSegmentProvider) ->
    $routeSegmentProvider
      .when '/',              'base'
      .when '/events',              'base.events'

      .segment 'base',
        templateUrl: '/templates/base.html'
        controller: 'baseCtrl'
        controllerAs: 'base'

      .within()

      .segment 'home',
        default: true
        templateUrl: '/templates/home.html'
        controller: 'homeCtrl'
        controllerAs: 'home'

      .segment 'events',
        templateUrl: '/templates/events.html'
        controller: 'eventsCtrl'
        controllerAs: 'events'

    $locationProvider.html5Mode
      enabled: true
      requireBase: false

    $routeProvider.otherwise
      redirectTo: '/'
  ]

angular.module('app')
  .run ['$rootScope'
  ($rootScope) =>

  ]