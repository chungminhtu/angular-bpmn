'use strict'

angular
.module('appControllers')
.controller 'editorCtrl', ['$scope', 'bpmnScheme', 'bpmnSettings', 'bpmnMock'
  ($scope, bpmnScheme, bpmnSettings, bpmnMock) ->

    vm = this
    scheme = bpmnMock.scheme1
    settings =
      engine:
        status: 'editor'

    instance = new bpmnScheme($('#scheme'))
    instance.setScheme(scheme)
    instance.setSettings(settings)
    instance.start()

    vm
]