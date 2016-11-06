'use strict'

angular
.module('appControllers')
.controller 'processMonitorCtrl', ['$scope', 'bpmnMock', '$log', '$timeout', 'bpmnScheme'
  ($scope, bpmnMock, $log, $timeout, bpmnScheme) ->

    scheme4 = angular.copy(bpmnMock.scheme4)
    settings =
      engine:
        status: 'viewer'

    # flow emulate
    #------------------------------------------------------------------------------
    exit = false
    step = 0
    objects = scheme4.objects

    status = (n, s)->
      if s == 'active'
        s += ' animated bounceIn'
      objects[n].status = s

    process = (n)->
      count = 0
      i = setInterval ()->
        switch count
          when 0
            objects[n].info = 'started'
          when 1
            objects[n].info = 'in process'
          when 2
            objects[n].info = 'ended'
          else
            objects[n].info = 'done'

        $timeout ()->
          $scope.$apply()

        count++
        if count >=4
          clearInterval(i)
          step++
      , 200

    randomInteger = (min, max)->
      rand = min + Math.random() * (max - min)
      rand = Math.round(rand)

      rand

    #-----------------------
    # main loop
    flowEmu = ()->

      if exit
        return

      switch step
        when 0
          status(0, 'active')
          status(5, '')
          status(11, '')
          step++
        when 1
          status(0, 'done')
          status(1, 'active')
          process(1)

        when 2
          status(1, 'done')
          status(7, '')
          status(6, '')
          status(3, '')
          status(2, 'active')
          process(2)

        when 3
          # gateway
          status(2, 'done')
          status(3, 'active')

          r = randomInteger(0, 1)
          if r == 1
            step = 6
          else
            step = 4

        when 4
          status(3, 'done')
          status(4, 'active')
          process(4)

        when 5
          # event end
          status(4, 'done')
          status(5, 'active')
          step = 0
          reset()

        when 6
          status(3, 'done')
          status(6, 'active')
          process(6)
          break

        when 7
          # gateway
          status(6, 'done')
          status(7, 'active')

          r = randomInteger(0, 1)
          if r == 1
            step = 8
          else
            step = 2

        when 8
          status(7, 'done')
          status(8, 'active')
          step++

        when 9
          status(8, 'done')
          status(9, 'active')
          status(12, 'active')
          step = 10

        when 10
          status(9, 'done')
          status(12, 'done')
          status(10, 'active')
          step = 11

        when 11
          status(10, 'done')
          status(11, 'active')
          step = 0
          reset()

        else
          break

      $timeout ()->
        $scope.$apply()

      $timeout ()->
        flowEmu()
      , 1000

    reset = ()->
      angular.forEach objects, (obj)->
        obj.status = ''
        obj.info = ''

    $scope.$on '$locationChangeStart', (e)->
      exit = true

    # init
    #------------------------------------------------------------------------------

    instance = new bpmnScheme($('#scheme4'))
    instance.setScheme(scheme4)
    instance.setSettings(settings)
    instance.start().then ()->
      flowEmu()
]