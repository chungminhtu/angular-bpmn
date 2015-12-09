
'use strict'

angular
.module('angular-bpmn')
.factory 'bpmnObjectFact', ['bpmnSettings', '$compile', '$rootScope', 'log', '$templateRequest', '$templateCache'
  (bpmnSettings, $compile, $rootScope, log, $templateRequest, $templateCache) ->
    class schemeObject

      isDebug: true
      parentScope: null
      data: null
      anchor: null
      make: null
      draggable: null
      templateUrl: null
      template: null
      element: null
      container: null
      size: null
      points: null

      constructor: (data, parentScope)->
        log.debug 'object construct'
        @parentScope = parentScope
        @settings = parentScope.settings
        @data = data

        tpl = bpmnSettings.template(data.type.name)
        @anchor = tpl.anchor
        @size = tpl.size
        @make = tpl.make
        @draggable = tpl.draggable
        @templateUrl = tpl.templateUrl || null
        @template = tpl.template || null
        @templateUpdate()

      templateUpdate: ()->
        childScope = $rootScope.$new()
        childScope.data = @data
        childScope.instance = @parentScope.instance
        childScope.object = this

        # компилим темплейт для него
        appendToElement = (element)=>
          @element
            .empty()
            .append(element)

        if @templateUrl? && @templateUrl != ''
          if !@element?
            @element = $compile('<div bpmn-object class="'+@data.type.name+' draggable etc" ng-class="[data.status]"></div>')(childScope)
          templateUrl = @settings.theme.root_path + '/' + @settings.engine.theme + '/' + @templateUrl
          template = $templateCache.get(templateUrl)
          if !template?
            log.debug 'template not found', templateUrl
            @elementPromise = $templateRequest(templateUrl)
            @elementPromise.then (result)->
              appendToElement($compile(result)(childScope))
              $templateCache.put(templateUrl, result)
          else
            appendToElement($compile(template)(childScope))
        else
          if !@element?
            @element = $compile(@template)(childScope)

      generateAnchor: (options)->
        if !@anchor || @anchor.length == 0
          return

        if !@element
          log.debug 'generateAnchor: @element is null', this
          return

        points = []
        angular.forEach @anchor, (anchor)=>
          point = @parentScope.instance.addEndpoint(@element, {
            anchor: anchor
            maxConnections: -1
          }, options)

          if points.indexOf(point) == -1
            points.push(point)

        @points = points

      appendTo: (container, options)->
        if !@element || @element == ''
          log.debug 'appendTo: @element is null', this
          return

        @container = container
        container.append(@element)
        $(@element).css({
          width: @size.width
          height: @size.height
        })

#        @checkParent()

        # генерируем точки соединений для нового объекта
        @generateAnchor(options)

#        @setDraggable(@draggable)

      select: (tr)->

    schemeObject
  ]