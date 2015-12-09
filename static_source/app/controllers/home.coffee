'use strict'

angular
.module('appControllers')
.controller 'homeCtrl', ['$scope', 'bpmnMock', 'bpmnScheme'
  ($scope, bpmnMock, bpmnScheme) ->

    vm = this
    settings =
      engine:
        status: 'viewer'

    scheme = bpmnMock.scheme1
    instance = new bpmnScheme($('#simply-scheme'))
    instance.setScheme(scheme)
    instance.setSettings(settings)
    instance.start()

    vm
]