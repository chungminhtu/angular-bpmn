'use strict'

angular
.module('appControllers')
.controller 'baseSchemeCtrl', ['$scope', '$log', 'bpmnScheme', 'bpmnMock'
  ($scope, $log, bpmnScheme, bpmnMock) ->

    vm = this
    scheme3 = bpmnMock.scheme3
    settings =
      engine:
        status: 'viewer'

    instance = new bpmnScheme($('#scheme3'))
    instance.setScheme(scheme3)
    instance.setSettings(settings)
    instance.start()

    vm
]