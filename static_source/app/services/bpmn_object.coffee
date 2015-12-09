
'use strict'

angular
.module('angular-bpmn')
.directive 'bpmnObject', ['log', '$timeout', '$templateCache', '$compile', '$templateRequest', '$q'
  (log, $timeout, $templateCache, $compile, $templateRequest, $q) ->
    restrict: 'A'
    controller: ["$scope", "$element", ($scope, $element)->

      container = $($element)



      if $scope.data.type.name == 'poster'
        container.find('img').on 'dragstart', (e)->
          e.preventDefault()

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