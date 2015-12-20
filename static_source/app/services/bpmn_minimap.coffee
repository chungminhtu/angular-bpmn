
'use strict'

angular
.module('angular-bpmn')
.factory 'bpmnMinimap', ['log', '$compile', '$rootScope'
  (log, $compile, $rootScope) ->
    class minimap
      container: null
      parent_container: null
      scope: null
      $viewport: null
      scheme_class: 'scheme'
      minimap_class: 'minimap'
      viewport_class: 'viewport'

      constructor: (container)->
        @parent_container = container
        @scope = $rootScope.$new()
        @parent_container.append($compile('<div class="'+@minimap_class+'"><div class="'+@viewport_class+'"></div></div>')(@scope))
        @$minimap = $(@parent_container).find('.'+@minimap_class)
        @$scheme = $(@parent_container).find('.'+@scheme_class)
        @$viewport = @$minimap.find('.'+@viewport_class)
        @ratio = 0.1

        @bindings()
        @updateViewport()
        @renderScheme()

      updateViewport: ()->
        g = @parent_container.height()
        h = @parent_container.width()
        j = @$scheme.scrollTop()
        i = @$scheme.scrollLeft()

        @$viewport.css(
          left: i * @ratio
          top: j * @ratio).width(h * @ratio).height g * @ratio

      onresize: ()->
        @updateViewport()

      bindings: ()->
        @scrolling = false

        @parent_container.on 'resize', ()=>
          @onresize()

        @$minimap.click (i)=>
          l = i.pageX - ($(i.target).offset().left) - (@$viewport.width() / 2)
          k = i.pageY - ($(i.target).offset().top) - (@$viewport.height() / 2)
          h = @$minimap.width() - @$viewport.width()
          j = @$minimap.height() - @$viewport.height()
          if l < 0
            l = 0
          if l > h
            l = h
          if k < 0
            k = 0
          if k > j
            k = j

          @$viewport.css
            left: l
            top: k

          @scrolled @$viewport.position()

        @$viewport.draggable
          containment: 'parent'
          start: (h, i)=>
            @scrolling = true
          drag: (h, i)=>
            @scrolled i.position
          stop: (h, i)=>
            @scrolling = false
            @scrolled i.position

        @$scheme.scroll ->
          log.debug 'element scrolling'

      scrolled: (h)->
        @$scheme.css
          left: -h.left / @ratio
          top: -h.top / @ratio

      renderScheme: ()->
        svgElements= @$scheme.find('.task, .event, .group, .gateway')
        svgElements.each (k, v)->
          log.debug v

      destroy: ()->
        @parent_container.off 'resize'


    minimap
  ]
