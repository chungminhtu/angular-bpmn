
'use strict'

angular
.module('angular-bpmn')
.factory 'bpmnScheme', ['$rootScope', '$log', 'bpmnUuid', '$compile', 'bpmnSettings', '$templateCache', '$templateRequest', '$q', '$timeout', 'bpmnObjectFact'
  ($rootScope, $log, bpmnUuid, $compile, bpmnSettings, $templateCache, $templateRequest, $q, $timeout, bpmnObjectFact) ->
    class bpmnScheme

      isDebug: true
      isStarted: false
      id: null
      scope: null
      container: null
      wrapper: null
      cache: null
      style_id: 'bpmn-style-theme'
      wrap_class: 'bpmn-wrapper'
      schemeWatch: null

      constructor: (container, settings)->
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
        @scope.extScheme = {}          # scheme
        @scope.intScheme =          # real scheme objects
          objects: {}
          connectors: []
        @scope.settings = {}
        @setSettings(settings)

        #TODO add preloader

      setStatus: ()->
        if @scope.settings.engine.status == 'editor'
          @container.addClass('editor')
        else
          @container.addClass('viewer')

      setScheme: (scheme)->
        if !scheme?
          scheme = @scope.extScheme || {}

        @scope.extScheme = scheme

      setSettings: (settings)->
        if !settings?
          settings = {}

        @scope.settings = $.extend(true, bpmnSettings, angular.copy(settings))

      # load style
      #------------------------------------------------------------------------------
      loadStyle: ()->
        theme_name = @scope.settings.engine.theme
        file = @scope.settings.theme.root_path + '/' + theme_name + '/style.css'
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

        @log 'load style file:', file

        @wrapper.removeClass()
        @wrapper.addClass(@wrap_class + ' ' + theme_name)

      # template caching
      #------------------------------------------------------------------------------
      cacheTemplates: ()->
        angular.forEach @scope.settings.templates, (type)=>
          if !type.templateUrl? || type.templateUrl == ''
            return

          templateUrl = @scope.settings.theme.root_path + '/' + @scope.settings.engine.theme + '/' + type.templateUrl
          template = $templateCache.get(templateUrl)
          if !template?
            templatePromise = $templateRequest(templateUrl)
            @cache.push(templatePromise)
            templatePromise.then (result)=>
              @log 'load template file:', templateUrl
              $templateCache.put(templateUrl, result)

      makePackageObjects: ()->
        @log 'make package objects'
        # Создадим все объекты, сохраним указатели в массиве
        # потому как возможны перекрёстные ссылки
        promise = []
        angular.forEach @scope.extScheme.objects, (object)=>
          obj = new bpmnObjectFact(object, @scope)
          @scope.intScheme.objects[object.id] = obj
          promise.push(obj.elementPromise)

        # Ждём когда прогрузятся все шаблоны
        $q.all(promise).then ()=>
          # проходим по массиву ранее созданных объектов,
          # и добавляем в дом
          angular.forEach @scope.intScheme.objects, (object)=>
            # добавляем объект в контейнер
            object.appendTo(@container, @scope.settings.point)

            # left button click event
            @scope.instance.off object.element
            @scope.instance.on object.element, 'click', ()->
              @scope.selected = []
              @scope.$apply(
                @scope.selected.push(object.data.id)
              )

              deselectAll()

              object.select(true)

          # batcengine()
          # connect()

          @isStarted = true
          #TODO update preloader fadeOut

      start: ()->
        @log 'start'
        @loadStyle()
        @scope.instance = jsPlumb.getInstance($.extend(true, @scope.settings.instance, {Container: @container}))
        @cache = []
        @cacheTemplates()
        @container.addClass('bpmn')
        @setStatus()

        # watchers
        if @schemeWatch
          @schemeWatch()
        @schemeWatch = @scope.$watch 'extScheme', (val, old_val)=>
          if val == old_val
            return

          @restart()

        # make objects
        $q.all(@cache).then ()=>
          @makePackageObjects()

      destroy: ()->
        @log 'destroy'
        #TODO update preloader fadeIn

        if @schemeWatch
          @schemeWatch()

      restart: ()->
        @log 'restart'
        if @isStarted?
          @destry()
        @start()

      log: ()->
        if !@isDebug?
          return

        msg = ''
        angular.forEach arguments, (arg)->
          msg += arg + ' '
        $log.debug msg

    bpmnScheme
  ]