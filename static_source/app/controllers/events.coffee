'use strict'

angular
.module('appControllers')
.controller 'eventsCtrl', ['$scope', 'bpmnMock', 'bpmnScheme'
  ($scope, bpmnMock, bpmnScheme) ->

    vm = this
    settings =
      engine:
        status: 'viewer'

    eventTypes =
      start:
        simply:
          top_level: true
          interrupts: false
          not_interrupts: false
        message:
          top_level: true
          interrupts: true
          not_interrupts: true
        timer:
          top_level: true
          interrupts: true
          not_interrupts: true
        escalation:
          top_level: false
          interrupts: true
          not_interrupts: true
        conditional:
          top_level: true
          interrupts: true
          not_interrupts: true
        link:
          top_level: false
          interrupts: false
          not_interrupts: false
        error:
          top_level: false
          interrupts: true
          not_interrupts: false
        cancel:
          top_level: false
          interrupts: false
          not_interrupts: false
        compensation:
          top_level: false
          interrupts: true
          not_interrupts: false
        signal:
          top_level: true
          interrupts: true
          not_interrupts: true
        compound:
          top_level: true
          interrupts: true
          not_interrupts: true
        parallel:
          top_level: true
          interrupts: true
          not_interrupts: true
        stop:
          top_level: false
          interrupts: false
          not_interrupts: false

      intermediate:
        simply:
          machinig: false
          edge_interrupts: false
          edge_not_interrupts: false
          generated: true
        message:
          machinig: true
          edge_interrupts: true
          edge_not_interrupts: true
          generated: true
        timer:
          machinig: true
          edge_interrupts: true
          edge_not_interrupts: true
          generated: false
        escalation:
          machinig: false
          edge_interrupts: true
          edge_not_interrupts: true
          generated: true
        conditional:
          machinig: true
          edge_interrupts: true
          edge_not_interrupts: true
          generated: false
        link:
          machinig: true
          edge_interrupts: false
          edge_not_interrupts: false
          generated: true
        error:
          machinig: false
          edge_interrupts: true
          edge_not_interrupts: false
          generated: false
        cancel:
          machinig: false
          edge_interrupts: true
          edge_not_interrupts: false
          generated: false
        compensation:
          machinig: false
          edge_interrupts: true
          edge_not_interrupts: false
          generated: true
        signal:
          machinig: true
          edge_interrupts: true
          edge_not_interrupts: true
          generated: true
        compound:
          machinig: true
          edge_interrupts: true
          edge_not_interrupts: true
          generated: true
        parallel:
          machinig: true
          edge_interrupts: true
          edge_not_interrupts: true
          generated: false
        stop:
          machinig: false
          edge_interrupts: false
          edge_not_interrupts: false
          generated: false


      end:
        simply:
          0: true
        message:
          0: true
        timer:
          0: false
        escalation:
          0: true
        conditional:
          0: false
        link:
          0: false
        error:
          0: true
        cancel:
          0: true
        compensation:
          0: true
        signal:
          0: true
        compound:
          0: true
        parallel:
          0: false
        stop:
          0: true

    $scope.scheme =
      id: 3
      version: 1.0
      name: ''
      description: ''
      objects: [
        {
          id: 0
          type:
            name: 'poster'
          url: '/images/event_poster.svg'
          draggable: false
          sub: {}
          position:
            top: -1
            left: 2
          status: ''
          error: ''
          title: 'Event poster'
          description: ''
        }
      ]
      connectors: []

    rows = {}
    angular.forEach eventTypes, (x, x_key)->

      angular.forEach x, (y, y_key)->
        if !rows[y_key]?
          rows[y_key] = {}

        if !rows[y_key][x_key]?
          rows[y_key][x_key] = {}

        angular.forEach y, (z, z_key)->
          rows[y_key][x_key][z_key] = z

    id = 0
    top = 175
    angular.forEach rows, (row, r_key)->
      left = 225
      angular.forEach row, (col, c_key)->
        angular.forEach col, (el, e_key)->

          if el

            id++
            object =
              id: id
              type:
                name: 'event'
              position:
                top: top
                left: left
              status: ''
              error: ''
              title: ''
              description: ''

            if !object.type[c_key]?
              object.type[c_key]={}

            if !object.type[c_key][r_key]?
              object.type[c_key][r_key]={}

            object.type[c_key][r_key][e_key] = el

            $scope.scheme.objects.push(object)

          left += 49
      top += 50

    instance = new bpmnScheme($('#events'))
    instance.setScheme($scope.scheme)
    instance.setSettings(settings)
    instance.start()

    vm
]