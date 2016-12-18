'use strict'

angular
.module('appControllers')
.controller 'editorCtrl', ['$scope', 'bpmnScheme', 'bpmnSettings', 'bpmnMock', 'log'
  ($scope, bpmnScheme, bpmnSettings, bpmnMock, log) ->

    vm = this
    vm.scheme = angular.copy(bpmnMock.scheme1)
    settings =
      engine:
        status: 'editor'
        container:
          theme_selector: false
      editorPallet:
        groups: [
          {
            name: 'event'
            items: [
              {
                type:
                  name: 'event'
                  start:
                    0:
                      0: true
                title: 'start'
                class: 'bpmn-icon-start-event-none'
                tooltip: 'Create start event'
                shape: bpmnSettings.template('event')
              }
              {
                type:
                  name: 'event'
                  end:
                    simply:
                      top_level: true
                title: 'end'
                class: 'bpmn-icon-end-event-none'
                tooltip: 'Create end event'
                shape: bpmnSettings.template('event')
              }
            ]
          }
          {
            name: 'gateway'
            items: [
              {
                type:
                  name: 'gateway'
                  start:
                    0:
                      0: true
                title: 'gateway'
                class: 'bpmn-icon-gateway-xor'
                tooltip: 'Create gateway'
                shape: bpmnSettings.template('gateway')
              }
            ]
          }
          {
            name: 'task'
            items: [
              {
                type:
                  name: 'task'
                title: 'task'
                class: 'bpmn-icon-task-none'
                tooltip: 'Create task'
                shape: bpmnSettings.template('task')
              }
            ]
          }
        ]

    redactor = new bpmnScheme($('#scheme'))
    redactor.setScheme(vm.scheme)
    redactor.setSettings(settings)
    redactor.start()

    vm.serialize =->
      log.debug 'serialize'
      vm.scheme = redactor.getScheme()

    vm
]