'use strict'

angular
.module('appControllers')
.controller 'editorCtrl', ['$scope', 'bpmnScheme', 'bpmnSettings', 'bpmnMock'
  ($scope, bpmnScheme, bpmnSettings, bpmnMock) ->

    vm = this
    vm.scheme = bpmnMock.scheme1
    settings =
      engine:
        status: 'editor'

    instance = new bpmnScheme($('#scheme'))
    instance.setScheme(vm.scheme)
    instance.setSettings(settings)
    instance.start()

    vm
]