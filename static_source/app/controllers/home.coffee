'use strict'

angular
.module('appControllers')
.controller 'homeCtrl', ['$scope', 'bpmnMock', 'bpmnScheme', '$log'
  ($scope, bpmnMock, bpmnScheme, $log) ->

    vm = this

    scheme = bpmnMock.scheme1
    instance = new bpmnScheme($('#simply-scheme'))
    instance.setScheme(scheme)

    vm
]