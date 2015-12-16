'use strict'

angular
.module('appControllers')
.controller 'baseSchemeWithSwimlaneCtrl', ['$scope', '$log', 'bpmnScheme', 'bpmnMock'
  ($scope, $log, bpmnScheme, bpmnMock) ->

    vm = this
    scheme5 = bpmnMock.scheme5
    settings =
      engine:
        status: 'viewer'

    instance = new bpmnScheme($('#scheme5'))
    instance.setScheme(scheme5)
    instance.setSettings(settings)
    instance.start()

    vm
]