
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

      if data.shape.helper
        template = $compile('<div class="helper">'+data.shape.helper+'</div>')($scope)
      else if data.shape.templateUrl
        elementPromise = $templateRequest($scope.settings.theme.root_path + '/' + $scope.settings.engine.theme + '/' + data.shape.templateUrl)
        elementPromise.then (result)->
          template = $compile('<div class="helper" ng-class="[bpmnPaletteDraggable.type.name]">'+result+'</div>')($scope)

      container.draggable({
        helper: ()->
          template
#        appendTo: "body"
      })
]
