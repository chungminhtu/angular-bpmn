'use strict'

angular
.module('appControllers')
.controller 'homeCtrl', ['$scope', 'bpmnMock'
  ($scope, bpmnMock) ->

    vm = this
    vm.scheme = bpmnMock.schema1

    vm
]