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
      {name: 'base scheme with swimlane',path: 'base.base_scheme_with_swimlane'}
      {name: 'update scheme data',path: 'base.update_scheme_data'}
    ]


    vm
]