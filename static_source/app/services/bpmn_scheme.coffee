
'use strict'

LEFT_MB = 1
MIDDLE_MB = 2
RIGHT_MB = 3

angular
.module('angular-bpmn')
.factory 'bpmnScheme', ['$rootScope', 'log', 'bpmnUuid', '$compile', 'bpmnSettings', '$templateCache', '$templateRequest', '$q', '$timeout', 'bpmnObjectFact'
  ($rootScope, log, bpmnUuid, $compile, bpmnSettings, $templateCache, $templateRequest, $q, $timeout, bpmnObjectFact) ->
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
        preventSelection(document)

#        create scope
        @scope = $rootScope.$new()
        @scope.extScheme = {}          # scheme
        @scope.intScheme =          # real scheme objects
          objects: {}
          connectors: []
        @scope.settings = {}
        @scope.selected = []
        @scope.zoom = 1
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

        log.debug 'load style file:', file

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
              log.debug 'load template file:', templateUrl
              $templateCache.put(templateUrl, result)

      makePackageObjects: ()->
        log.debug 'make package objects'
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
            @scope.instance.on object.element, 'click', ()=>
              @scope.selected = []
              @scope.$apply(
                @scope.selected.push(object.data.id)
              )

              @deselectAll()

              object.select(true)

          @instanceBatch()
          @connectPackageObjects()

          @isStarted = true
          #TODO update preloader fadeOut

      instanceBatch: ()->
        @scope.instance.batch ()=>
          log.debug 'instance batch'

          # все элементы внутри контейнера буду подвижны
          if @scope.settings.engine.status == 'editor'
            @scope.instance.draggable(@container.find(".etc"), @scope.settings.draggable)

      connectPackageObjects: ()->
        if !@scope.extScheme?.connectors?
          return

        log.debug 'connect package objects'

        angular.forEach @scope.extScheme.connectors, (connector)=>
          if (!connector.start || !connector.end) ||
              (!@scope.intScheme.objects[connector.start.object] || !@scope.intScheme.objects[connector.end.object]) ||
              (!@scope.intScheme.objects[connector.start.object].points || !@scope.intScheme.objects[connector.end.object].points)
            return

          # связь создаётся по точкам созданным ранее
          source_obj_points = {}
          target_obj_points = {}

          angular.forEach @scope.intScheme.objects, (object)->
            if object.data.id == connector.start.object
              source_obj_points = object.points
            if object.data.id == connector.end.object
              target_obj_points = object.points

          if !source_obj_points[connector.start.point]?
            log.error 'connect: source not found', this
            return

          if !target_obj_points[connector.end.point]?
            log.error 'connect: target not found', this
            return

          # связь создаётся по точкам
          points = {
            sourceEndpoint: source_obj_points[connector.start.point]

          # Привязка к объекту, якорь выбирается автоматически
#          target: @scope.intScheme.objects[connector.end.object]['object']

          # Привязка к конкретному якорю объекта
            targetEndpoint: target_obj_points[connector.end.point]
          }

          # подпись для связи
          if connector.title && connector.title != ""
            points['overlays'] = [
              [ "Label", { label:connector.title, cssClass: "aLabel" }, id:"myLabel" ]
            ]

          @scope.intScheme.connectors.push(@scope.instance.connect(points, @scope.settings.connector))

      addObject: (object)->

      removeObject: (object)->

      deselectAll: ()->
        angular.forEach @scope.intScheme.objects, (object)->
          object.select(false)

      #
      # http://jsfiddle.net/X2PZP/3/
      #
      panning: ()->
        template = $compile('<div class="panning-cross">
<svg>
 <g id="layer1" transform="translate(-291.18256,-337.29837)">
   <path id="path3006" stroke-linejoin="miter" d="m331.14063,340.36763,0,29.99702" stroke="#000" stroke-linecap="butt" stroke-miterlimit="4" stroke-dasharray="none" stroke-width="2.01302433"/>
   <path id="path3008" stroke-linejoin="miter" d="m316.11461,355.29379,30.24144,0" stroke="#000" stroke-linecap="butt" stroke-miterlimit="4" stroke-dasharray="none" stroke-width="2"/>
 </g>
</svg>
<div class="zoom-info">({{zoom}})</div>
</div>')(@scope)
        @container.append(template)
        $(template).css({
          position: 'absolute'
          top: -23
          left: -45
        })

        drag =
          x: 0
          y: 0
          state: false

        delta =
          x: 0
          y: 0

        @wrapper.on 'mousedown', (e)->
          if $(e.target).hasClass('ui-resizable-handle')
            return

          if !drag.state && e.which == LEFT_MB
            drag.x = e.pageX
            drag.y = e.pageY
            drag.state = true

        @wrapper.on 'mousemove', (e)=>
          if drag.state
            delta.x = e.pageX - drag.x
            delta.y = e.pageY - drag.y

            cur_offset = @container.offset()

            @container.offset({
              left: (cur_offset.left + delta.x)
              top: (cur_offset.top + delta.y)
            })

            drag.x = e.pageX
            drag.y = e.pageY

        @wrapper.on 'mouseup', (e)->
          if drag.state
            drag.state = false

        @wrapper.on 'contextmenu', (e)->
          return false

        @wrapper.on 'mouseleave', (e)->
          if drag.state
            drag.state = false

        # zoom
        #-----------------------------------
        @wrapper.on 'mousewheel', (e)=>
          e.preventDefault()

          @scope.zoom += 0.1 * e.deltaY
          @scope.zoom = parseFloat(@scope.zoom.toFixed(1))
          if @scope.zoom < 0.1
            @scope.zoom = 0.1
          else if @scope.zoom > 2
            @scope.zoom = 2

          @scope.instance.setZoom(@scope.zoom)
          @scope.instance.repaintEverything(@scope.zoom)

          $timeout ()=>
            @scope.$apply(
              @scope.zoom
            )
          , 0

          @container.css({
            '-webkit-transform':@scope.zoom
            '-moz-transform':'scale('+@scope.zoom+')'
            '-ms-transform':'scale('+@scope.zoom+')'
            '-o-transform':'scale('+@scope.zoom+')'
            'transform':'scale('+@scope.zoom+')'
          })

      start: ()->
        log.debug 'start'
        @panning()
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

        if @scope.settings.engine.container?.resizable?
          @wrapper.resizable
            minHeight: 200
            minWidth: 400
            grid: 10
            handles: 's'
            start: ()->
            resize: ()->

        @scope.$on '$routeChangeSuccess', ()=>
          @destroy()

      destroy: ()->
        log.debug 'destroy'
        #TODO update preloader fadeIn

        if @scope.settings.engine.container?.resizable?
          @wrapper.resizable('destroy')

        if @schemeWatch
          @schemeWatch()

        # panning
        @wrapper.off 'mousedown'
        @wrapper.off 'mousemove'
        @wrapper.off 'mouseup'
        @wrapper.off 'contextmenu'
        @wrapper.off 'mousewheel'

      restart: ()->
        log.debug 'restart'
        if @isStarted?
          @destry()
        @start()

    bpmnScheme
  ]