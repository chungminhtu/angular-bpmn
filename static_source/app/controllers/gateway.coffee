'use strict'

angular
  .module('appControllers')
  .controller 'gatewayCtrl', ['$scope', '$log', 'bpmnScheme'
  ($scope, $log, bpmnScheme) ->

    vm = this
    scheme =
      id: 1
      description: ''
      objects: [
        {
          id: 0
          type:
            name: 'poster'
          url: '/images/gateway_poster.svg'
          draggable: false
          position:
            top: 30
            left: 10
          status: ''
          error: ''
          title: 'Gateway poster'
          description: ''
        }
        {
          id: 1
          type:
            name: 'gateway'
          draggable: true
          parent: 0
          position:
            top: 80
            left: 10
          status: ''
          error: ''
          title: ''
          description: ''
        }
        {
          id: 2
          type:
            name: 'gateway'
            base: 'data'
            status: 'xor'
          draggable: true
          parent: 0
          position:
            top: 80
            left: 85
          status: ''
          error: ''
          title: ''
          description: ''
        }
        {
          id: 3

          draggable: true
          parent: 0
          type:
            name: 'gateway'
            base: 'event'
            status: 'xor'
          position:
            top: 175
            left: 10
          status: ''
          error: ''
          title: ''
          description: ''
        }
        {
          id: 4
          type: 'gateway'
          draggable: true
          parent: 0
          type:
            name: 'gateway'
            base: 'data'
            status: 'and'
          position:
            top: 255
            left: 10
          status: ''
          error: ''
          title: ''
          description: ''
        }
        {
          id: 5
          draggable: true
          parent: 0
          type:
            name: 'gateway'
            base: 'data'
            status: 'or'
          position:
            top: 350
            left: 10
          status: ''
          error: ''
          title: ''
          description: ''
        }
        {
          id: 6
          draggable: true
          parent: 0
          type:
            name: 'gateway'
            base: 'data'
            status: 'complex'
          position:
            top: 480
            left: 10
          status: ''
          error: ''
          title: ''
          description: ''
        }
        {
          id: 7
          draggable: true
          parent: 0
          type:
            name: 'gateway'
            base: 'event'
            status: 'or'
          position:
            top: 350
            left: 280
          status: ''
          error: ''
          title: ''
          description: ''
        }
        {
          id: 8
          draggable: true
          parent: 0
          type:
            name: 'gateway'
            base: 'event'
            status: 'and'
          position:
            top: 480
            left: 280
          status: ''
          error: ''
          title: ''
          description: ''
        }
      ]
      connectors: []
    settings =
      engine:
        status: 'viewer'

    instance = new bpmnScheme($('#gateway'))
    instance.setScheme(scheme)
    instance.setSettings(settings)
    instance.start()

    vm
  ]