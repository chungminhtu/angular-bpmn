
'use strict'

angular
.module('angular-bpmn')
.directive 'bpmnObject', ['$log', '$timeout', '$templateCache', '$compile', '$templateRequest'
  ($log, $timeout, $templateCache, $compile, $templateRequest) ->
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

      # init element
      #------------------------------------------------------------------------------
      getTemplate()
      updateStyle()

      $log.debug $scope.object

    ]
    link: ($scope, element, attrs) ->

]