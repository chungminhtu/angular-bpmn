'use strict'

angular
.module('appControllers')
.controller 'baseCtrl', ['$scope', 'log'
  ($scope, log) ->

    vm = this
    vm.title = ''
    vm.menu = [
      {name: 'home', path: 'base.home'}
      {name: 'events',path: 'base.events'}
      {name: 'tasks',path: 'base.tasks'}
      {name: 'gateway',path: 'base.gateway'}
      {name: 'two schemes',path: 'base.two_scheme'}
      {name: 'base scheme',path: 'base.base_scheme'}
      {name: 'base scheme with grouping',path: 'base.base_scheme_with_grouping'}
    ]


    vm
]