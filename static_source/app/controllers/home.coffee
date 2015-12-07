'use strict'

angular
.module('appControllers')
.controller 'homeCtrl', ['$scope', 'bpmnMock', 'bpmnScheme', '$log', '$timeout'
  ($scope, bpmnMock, bpmnScheme, $log, $timeout) ->

    vm = this

    scheme = bpmnMock.scheme1
    instance = new bpmnScheme($('#simply-scheme'))
    instance.setScheme(scheme)
    instance.start()

    vm
]