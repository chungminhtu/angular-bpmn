'use strict'

angular
.module('appControllers')
.controller 'baseCtrl', ['$scope', '$log'
  ($scope, $log) ->

    vm = this
    vm.title = ''
    vm.menu = [
      {name: 'home', path: 'base.home'}
    ]


    vm
]