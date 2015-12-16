
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
      .when '/',                    'base'
      .when '/',                    'base.home'
      .when '/events',              'base.events'
      .when '/tasks',               'base.tasks'
      .when '/gateway',             'base.gateway'
      .when '/two_scheme',          'base.two_scheme'
      .when '/base_scheme',         'base.base_scheme'
      .when '/base_scheme_with_grouping',         'base.base_scheme_with_grouping'

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

      .segment 'tasks',
        templateUrl: '/templates/tasks.html'
        controller: 'tasksCtrl'
        controllerAs: 'tasks'

      .segment 'gateway',
        templateUrl: '/templates/gateway.html'
        controller: 'gatewayCtrl'
        controllerAs: 'gateway'

      .segment 'two_scheme',
        templateUrl: '/templates/two_scheme.html'
        controller: 'twoSchemeCtrl'
        controllerAs: 'ctrl'

      .segment 'base_scheme',
        templateUrl: '/templates/base_scheme.html'
        controller: 'baseSchemeCtrl'
        controllerAs: 'ctrl'

      .segment 'base_scheme_with_grouping',
        templateUrl: '/templates/base_scheme_with_grouping.html'
        controller: 'baseSchemeWithGroupingCtrl'
        controllerAs: 'ctrl'

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