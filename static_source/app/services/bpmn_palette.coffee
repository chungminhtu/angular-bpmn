
'use strict'

angular
.module('angular-bpmn')
.directive 'bpmnPalette', ['log', '$timeout', '$templateCache', '$compile', '$templateRequest', '$q'
  (log, $timeout, $templateCache, $compile, $templateRequest, $q) ->
    restrict: 'A'
    scope:
      bpmnPalette: '='
    template: '<div class="group" ng-repeat="group in bpmnPalette.groups" data-group="{{::group.name}}">
<div class="entry" ng-repeat="entry in group.items" ng-class="[entry.class]" bpmn-palette-draggable="entry" settings="bpmnPalette.settings"></div>'
    link: ($scope, element, attrs) ->
  ]
