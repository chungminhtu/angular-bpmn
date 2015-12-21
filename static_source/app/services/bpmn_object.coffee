
'use strict'

angular
.module('angular-bpmn')
.directive 'bpmnObject', ['log', '$timeout', '$templateCache', '$compile', '$templateRequest', '$q'
  (log, $timeout, $templateCache, $compile, $templateRequest, $q) ->
    restrict: 'A'
    controller: ["$scope", "$element", ($scope, $element)->

      container = $($element)
      childsAABB = {}

      switch $scope.data.type.name
        when 'poster'
          container.find('img').on 'dragstart', (e)->
            e.preventDefault()
        when 'group'
          container.resizable
            minHeight: 100
            minWidth: 100
            grid: 10
            handles: "all"
            start: (event, ui)->
              childsAABB = $scope.object.getChildsAABB()

            stop: (event, ui)->
              $scope.instance.repaintEverything()
            resize: (event, ui)->
              # во время изменения размера контейнера
              # контролирует нахлёст родительского блока с дочерними
              if container.width() <= childsAABB['l_max'] + 20
                container.css('width', childsAABB['l_max'] + 20)

              if container.height() <= childsAABB['t_max'] + 20
                container.css('height', childsAABB['t_max'] + 20)

              $scope.instance.repaintEverything()
        when 'swimlane'
          container.resizable
            minHeight: 200
            minWidth: 400
            grid: 10
            handles: 'e'
            start: ()->
              childsAABB = $scope.object.getChildsAABB()
              $scope.instance.repaintEverything()

            resize: ()->
              # во время изменения размера контейнера
              # контролирует нахлёст родительского блока с дочерними по левой стороне
              if container.width() <= childsAABB['l_max'] + 20
                container.css('width', childsAABB['l_max'] + 20)
              $scope.instance.repaintEverything()
        when 'swimlane-row'
          container.resizable
            minHeight: 200
            minWidth: 400
            grid: 10
            handles: 's'
            start: ()->
              childsAABB = $scope.object.getChildsAABB()
              $scope.instance.repaintEverything()

            resize: ()->
              if container.width() <= childsAABB['t_max'] + 20
                container.css('width', childsAABB['t_max'] + 20)
              $scope.instance.repaintEverything()

      updateStyle = ()->
        style =
          top: $scope.data.position.top
          left: $scope.data.position.left

        container.css(style)

        $scope.instance.repaintEverything()

      $scope.$watch 'data.position', (val, old_val) ->
        if val == old_val
          return
        updateStyle()

      updateStyle()
    ]
    link: ($scope, element, attrs) ->

]