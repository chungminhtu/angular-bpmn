'use strict'

angular
.module('appControllers')
.controller 'editorCtrl', ['$scope', 'bpmnScheme', '$log', 'bpmnSettings', 'bpmnMock'
  ($scope, bpmnScheme, $log, bpmnSettings, bpmnMock) ->

    vm = this
    vm.theme = 'orange'
    vm.themes = bpmnSettings.theme.list
    scheme = {}
    settings =
      engine:
        theme: vm.theme
        status: 'editor'

    vm.palette =
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
                intermediate:
                  0:
                    0: true
              title: 'intermediate'
              class: 'bpmn-icon-intermediate-event-none'
              tooltip: 'Create intermediate event'
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
              title: 'xor'
              class: 'bpmn-icon-gateway-xor'
              tooltip: 'Create xor gateway'
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
        {
          name: 'group'
          items: [
            {
              type:
                name: 'group'
              title: 'group'
              class: 'bpmn-icon-task-none'
              tooltip: 'Create task'
              shape: bpmnSettings.template('group')
            }
          ]
        }
        {
          name: 'swimlane'
          items: [
            {
              type:
                name: 'swimlane'
              title: 'swimlane'
              class: 'bpmn-icon-participant'
              tooltip: 'Create swimlane'
              shape: bpmnSettings.template('swimlane')
            }
          ]
        }
      ]
      settings: angular.extend({}, bpmnSettings, settings)

    instance = new bpmnScheme($('#scheme'))
    instance.setScheme(scheme)
    instance.setSettings(settings)
    instance.start()

    $scope.themeChanged = ()->
      settings.engine.theme = vm.theme
      instance.setSettings(settings)

    vm
]