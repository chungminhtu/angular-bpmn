'use strict'

angular
.module('appControllers')
.controller 'baseSchemeWithGroupingCtrl', ['$scope', '$log', 'bpmnScheme', 'bpmnMock'
  ($scope, $log, bpmnScheme, bpmnMock) ->

    vm = this
    scheme4 = bpmnMock.scheme4
    settings =
      engine:
        status: 'viewer'

    instance = new bpmnScheme($('#scheme4'))
    instance.setScheme(scheme4)
    instance.setSettings(settings)
    instance.start()

    vm
]