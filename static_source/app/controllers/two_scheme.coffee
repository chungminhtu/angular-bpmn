'use strict'

angular
.module('appControllers')
.controller 'twoSchemeCtrl', ['$scope', '$log', 'bpmnScheme', 'bpmnMock'
  ($scope, $log, bpmnScheme, bpmnMock) ->

    vm = this
    scheme1 = bpmnMock.scheme1
    scheme2 = bpmnMock.scheme2
    settings =
      engine:
        status: 'viewer'

    $log.debug scheme2

    instance1 = new bpmnScheme($('#scheme1'))
    instance1.setScheme(scheme1)
    instance1.setSettings(settings)
    instance1.start()

    instance2 = new bpmnScheme($('#scheme2'))
    instance2.setScheme(scheme2)
    instance2.setSettings(settings)
    instance2.start()

    vm
]