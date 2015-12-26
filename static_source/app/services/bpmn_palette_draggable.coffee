
'use strict'

angular
.module('angular-bpmn')
.directive 'bpmnPaletteDraggable', ['log', '$timeout', '$templateCache', '$compile', '$templateRequest'
  (log, $timeout, $templateCache, $compile, $templateRequest) ->
    restrict: 'A'
    scope:
      bpmnPaletteDraggable: '='
      settings: '=settings'
    link: ($scope, element, attrs) ->
      container = $(element)
      data = $scope.bpmnPaletteDraggable
      template = {}

      helper = data.shape.helper || data.shape.templateUrl
      if helper
        elementPromise = $templateRequest($scope.settings.theme.root_path + '/' + $scope.settings.engine.theme + '/' + helper)
        elementPromise.then (result)->
          template = $compile('<div ng-class="[bpmnPaletteDraggable.type.name]">'+result+'</div>')($scope)

      container.draggable({
        helper: ()->
          template
        appendTo: "body"
      })
]
