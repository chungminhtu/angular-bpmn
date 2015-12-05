
'use strict'

angular
.module('angular-bpmn')
.factory 'bpmnScheme', ['$rootScope', '$log', 'bpmnUuid', '$compile', 'bpmnSettings', '$templateCache', '$templateRequest'
  ($rootScope, $log, bpmnUuid, $compile, bpmnSettings, $templateCache, $templateRequest) ->
    class bpmnScheme

      id: null
      scope: null
      container: null
      wrapper: null
      elements: null
      scheme: null
      settings: null
      cache: null
      instance: null
      style_id: 'bpmn-style-theme'
      wrap_class: 'bpmn-wrapper'
      template: '<div ng-repeat="object in scheme.objects" bpmn-object class="jtk-node draggable etc" ng-class="[object.status]"</div>'

      constructor: (container, settings, scheme)->
#        set unique id
        @id = bpmnUuid.gen()

#        set main container
        @container = container

#        set parent wrap
        wrapper = container.parent('.' + @wrap_class)
        if wrapper.length == 0
          container.wrap('<div class="' + @wrap_class + '"></div>')
        @wrapper = container.parent('.' + @wrap_class)

#        create scope
        @scope = $rootScope.$new()

        @setScheme(scheme)
        @setSettings(settings)
        @loadStyle()

        @cache = []
        @loadTemplates()

        @instance = jsPlumb.getInstance($.extend(true, @settings.instance, {Container: container}))
        @scope.instance = @instance

#        compile template
        @container.append($compile(@template)(@scope))
        @container.addClass('bpmn')

#        set status
        @setStatus()

        @instance.batch ()->
          @instance.draggable( ".etc", @settings.draggable)


      setStatus: ()->
        if @settings.engine.status == 'editor'
          @container.addClass('editor')
        else
          @container.addClass('viewer')

      setScheme: (scheme)->
        if !scheme?
          scheme = {}

        @scheme = scheme
        @scope.scheme = @scheme

      setSettings: (settings)->
        if !settings?
          settings = {}

        @settings = $.extend(true, bpmnSettings, angular.copy(settings))
        @scope.settings = @settings

        if @settings.engine.container?.resizable?
          @container.resizable
            minHeight: 200
            minWidth: 400
            grid: 10
            handles: 's'
            start: ()->
            resize: ()->

      # load style
      #------------------------------------------------------------------------------
      loadStyle: ()->
        theme_name = @settings.engine.theme
        file = @settings.theme.root_path + '/' + theme_name + '/style.css'
        # id="bpmn-style-theme-default"
        themeStyle = $('link#' + @style_id + '-' + theme_name)
        if themeStyle.length == 0
          $("<link/>", {
            rel: "stylesheet"
            href: file
            id: @style_id + '-' + theme_name
          }).appendTo("head")
        else
          themeStyle.attr('href', file)

        $log.info 'load style file:', file

        @wrapper.removeClass()
        @wrapper.addClass(@wrap_class + ' ' + theme_name)

      # template caching
      #------------------------------------------------------------------------------
      loadTemplates: ()->
        angular.forEach @settings.templates, (type)=>
          if !type.templateUrl? || type.templateUrl == ''
            return

          templateUrl = @settings.theme.root_path + '/' + @settings.engine.theme + '/' + type.templateUrl
          template = $templateCache.get(templateUrl)
          if !template?
            templatePromise = $templateRequest(templateUrl)
            @cache.push(templatePromise)
            templatePromise.then (result)->
              $log.info 'load template file:', templateUrl
              $templateCache.put(templateUrl, result)

      destroy: ()->

      update: ()->

      init: ()->

    bpmnScheme
  ]