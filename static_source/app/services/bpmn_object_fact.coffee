
'use strict'

angular
.module('angular-bpmn')
.factory 'bpmnObjectFact', ['bpmnSettings', '$compile', '$rootScope', 'log', '$templateRequest', '$templateCache'
  (bpmnSettings, $compile, $rootScope, log, $templateRequest, $templateCache) ->
    class schemeObject

      id: null
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
      settings: null
      childs: null
      position:
        top: 0
        left: 0
      isParent: false

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
        @childs = []
        @position =
          top: data.position.top
          left: data.position.left
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

        if @size
          $(@element).css({
            width: @size.width
            height: @size.height
          })
        else
          log.error '@size is null, element:', @element

        # bind select event
        @parentScope.instance.off @element
        @parentScope.instance.on @element, 'click', ()=>

          shift = false
          if key.getPressedKeyCodes().indexOf(16) > -1
            shift = true

          @parentScope.selected = [] if !shift
          @parentScope.$apply(
            @parentScope.selected.push(@data.id)
          )

          # deselect all
          if !shift
            angular.forEach @parentScope.intScheme.objects, (object)->
              object.select(false)

          @select(true)

        @checkParent()

        # генерируем точки соединений для нового объекта
        @generateAnchor(options)

        @setDraggable(@draggable)

      select: (tr)->
        if tr
          $(@element).addClass("selected")
        else
          $(@element).removeClass("selected")

      elementOffset: ()->
        p = $(@element).position()
        top = p.top
        left = p.left
        return {
          top: top
          left: left
          right: top + @size.width
          bottom: left + @size.height
        }

      getId: ()->
        if !@id?
          @id = $(@element).attr('id')

        @id

      setDraggable: (tr)->
        @parentScope.instance.setDraggable($(@element), tr)

      # --------------------------------------------------
      # группировка элементов
      # --------------------------------------------------

      group: (groupId)->
        @parentScope.instance.addToPosse(@getId(), {id:groupId,active:true})

      ungroup: (groupId)->
        @parentScope.instance.removeFromPosse(@getId(), groupId);

      # --------------------------------------------------
      # операции с потомками
      # --------------------------------------------------
      checkParent: ()->

        # Проверим конфиг, если указаны родители, подключимся к ним
        if !@data.parent? || @data.parent == ''
          if @data.draggable? && @data.draggable || @settings.engine.status == 'editor'
            @parentScope.instance.draggable(@element, $.extend({}, @settings.draggable, {
              stop: (event)=>
                @position.left = event.pos[0]
                @position.top = event.pos[1]
            }))

          return

        parent = null
        angular.forEach @parentScope.intScheme.objects, (obj)=>
          if obj.data.id == @data.parent
            parent = obj

        if !parent?
          return

        @element.removeClass("etc")

        parentId = @setParent(parent)
        #------------------------
        if @data.draggable? && @data.draggable || @settings.engine.status == 'editor'
          @parentScope.instance.draggable(@element, $.extend({}, @settings.draggable, {
            containment: parentId
            stop: (event)=>
              @position.left = event.pos[0]
              @position.top = event.pos[1]

              @parentScope.instance.repaintEverything()
          }))

      setParent: (parent)->
        if !parent?
          return

        parent_element = parent.element
        @parentScope.instance.setParent(@element, parent_element)
        id = parent_element.attr('id')

        parent.isParent = true
        if $.inArray(@data, parent.childs) == -1
          parent.childs.push(this)

        if parent_element.hasClass(id)
          return id

        parent_element
          .addClass(id)
          .removeClass("etc")

        #------------------------
        if @data.draggable? && @data.draggable || @settings.engine.status == 'editor'
          @parentScope.instance.draggable(parent_element, $.extend({}, @settings.draggable, {
            drag: (event, ui)=>
              @parentScope.instance.repaintEverything()
            stop: (event)=>
              @position.left = event.pos[0]
              @position.top = event.pos[1]

              @parentScope.instance.repaintEverything()
          }))

      removeParent: ()->
        #TODO add remove parent

      getAllChilds: ()->
        childs = []
        angular.forEach @childs, (child)->
          childs.push(child)
          tch = child.getAllChilds()
          if tch.length > 0
            childs = childs.concat(tch)

        return childs

      remove: ()->
        id = @getId()

        if !id?
          return

        log.debug 'remove: ', id

        @parentScope.instance
          .detachAllConnections(@element)
          .empty(id)
          .remove(id)

        @childs = null
        @isParent = false
        @container = null
        @element = null
        @points = null

    schemeObject
  ]