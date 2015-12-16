'use strict'

angular
.module('appControllers')
.controller 'updateSchemeDataCtrl', ['$scope', 'log', 'bpmnScheme', 'bpmnMock'
  ($scope, log, bpmnScheme, bpmnMock) ->

    vm = this
    settings =
      engine:
        status: 'viewer'

    $scope.scheme = bpmnMock.scheme1

    instance = new bpmnScheme($('#scheme'))
    instance.setScheme($scope.scheme)
    instance.setSettings(settings)
    instance.start()

    $scope.setState = (state)->
      if state == 'clear'
        $scope.scheme = {}
      else
        $scope.scheme = bpmnMock[state]

      instance.setScheme($scope.scheme)
      instance.restart()

    vm
]