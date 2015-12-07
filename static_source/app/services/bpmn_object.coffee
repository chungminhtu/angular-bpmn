
'use strict'

angular
.module('angular-bpmn')
.directive 'bpmnObject', ['$log', '$timeout', '$templateCache', '$compile', '$templateRequest', '$q'
  ($log, $timeout, $templateCache, $compile, $templateRequest, $q) ->
    restrict: 'A'
    controller: ["$scope", "$element", ($scope, $element)->
      container = $($element)

      appedndToElement = (element)=>
        container
        .empty()
        .append($compile(element)($scope))

      getTemplate = ()->
        template = $scope.settings.template($scope.object.type.name)
        container.addClass($scope.object.type.name)
        container.css({
          width: template.size.width
          height: template.size.height
        })
        templateUrl = template.templateUrl

        if templateUrl? && templateUrl != ''
          templateUrl = $scope.settings.theme.root_path + '/' + $scope.settings.engine.theme + '/' + templateUrl
          template = $templateCache.get(templateUrl)

          if template?
            template.then (template)->
              appedndToElement(template.data)
          else
            $log.warn 'template not found in cache, ', templateUrl
            @elementPromise = $templateRequest(templateUrl)
            @elementPromise.then (result)->
              $templateCache.put(templateUrl, result)
              appedndToElement(result)

        else
          $compile(template.template)($scope)

      updateStyle = ()->
        style =
          top: $scope.object.position.top
          left: $scope.object.position.left

        container.css(style)

        $scope.instance.repaintEverything()

      batchUpdate = ()->
        $scope.instance.batch ()->
          $scope.instance.draggable(container, $scope.settings.draggable)

          # Определяем какую роль будет играть объект на сцене,
          # Он может быть как исходящий, так и принимающий,
          # всё зависит от конфига к объекту
          template = $scope.settings.template($scope.object.type.name)

          if template.anchor.length == 0
            return

          if $.inArray('source', template.make) != -1
            $scope.instance.makeSource(container, $.extend($scope.settings.source, {anchor: template.anchor}))

          if $.inArray('target', template.make) != -1
            $scope.instance.makeTarget(container, $.extend($scope.settings.target, {anchor: template.anchor}))

      generateAnchor = ()->
        template = $scope.settings.template($scope.object.type.name)
        anchors = template.anchor
        if !anchors || anchors.length == 0
          return

        angular.forEach anchors, (anchor)->
          $scope.instance.addEndpoint(container, {
            anchor: anchor
            maxConnections: -1
          }, $scope.settings.point)

      # init element
      #------------------------------------------------------------------------------

      getTemplate()
      updateStyle()
      generateAnchor()
      batchUpdate()
    ]
    link: ($scope, element, attrs) ->

]