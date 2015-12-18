'use strict'

angular
.module('appControllers')
.controller 'themesCtrl', ['$scope', 'bpmnScheme', '$log', 'bpmnSettings', 'bpmnMock'
  ($scope, bpmnScheme, $log, bpmnSettings, bpmnMock) ->

    vm = this
    vm.theme = 'minimal'
    vm.themes = bpmnSettings.theme.list
    scheme3 = bpmnMock.scheme4
    settings =
      engine:
        status: 'viewer'

    instance = new bpmnScheme($('#scheme3'))
    instance.setScheme(scheme3)
    instance.setSettings(settings)
    instance.start()

    $scope.themeChanged = ()->
      settings.engine.theme = vm.theme
      instance.setSettings(settings)

    vm
]