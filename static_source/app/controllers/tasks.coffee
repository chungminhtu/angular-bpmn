'use strict'

angular
.module('appControllers')
.controller 'tasksCtrl', ['$scope', '$log', 'bpmnScheme'
  ($scope, $log, bpmnScheme) ->

    vm = this
    scheme =
      id: 0
      description: ''
      objects: [
        {
          id: 0
          type: 'poster'
          url: '/images/task_poster.svg'
          draggable: false
          type:
            name: 'poster'
          position:
            top: 30
            left: 10
          status: ''
          error: ''
          title: 'Task poster'
          description: ''
        }
        {
          id: 1
          type:
            name: 'task'
            status: ''
            action: ''
          parent: 0
          position:
            top: 90
            left: 0
          status: ''
          error: ''
          title: 'Задача'
          description: ''
        }
        {
          id: 2
          type:
            name: 'task'
            status: 'transaction'
            action: ''
          parent: 0
          position:
            top: 190
            left: 0
          status: ''
          error: ''
          title: 'Транзакция'
          description: ''
        }
        {
          id: 3
          type:
            name: 'task'
            status: 'event'
            action: ''
          parent: 0
          position:
            top: 290
            left: 0
          status: ''
          error: ''
          title: 'Событийный подпроцесс'
          description: ''
        }
        {
          id: 4
          type:
            name: 'task'
            status: 'cause_actions'
            action: ''
          parent: 0
          position:
            top: 390
            left: 0
          status: ''
          error: ''
          title: 'Вызывающее действие'
          description: ''
        }
      ]
      connectors: []
    settings =
      engine:
        status: 'viewer'

    instance = new bpmnScheme($('#tasks'))
    instance.setScheme(scheme)
    instance.setSettings(settings)
    instance.start()

    vm
]