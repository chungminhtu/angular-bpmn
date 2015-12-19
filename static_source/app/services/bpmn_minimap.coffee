
'use strict'

angular
.module('angular-bpmn')
.factory 'bpmnMinimap', ['log', '$compile', '$rootScope'
  (log, $compile, $rootScope) ->
    class minimap
      container: null
      scope: null
      navigator: null
      canvasSupported: null
      forceDom: false
      $canvas: null
      $viewport: null
      ctx: null
      $elem: null

      constructor: (container)->
        log.debug 'minimap'

        @container = container
        @scope = $rootScope.$new()

        @init()

      init: ()->
        navigator = $compile('<div class="mgNavigator"><canvas></canvas><div class="mgViewport"></div></div>')(@scope)
        @container.append(navigator)
        @$navigator = $(@container).find('.mgNavigator')
        @$canvas = @$navigator.find('canvas')
        @$elem = $(@container).find('.scheme')

        @ratio = 0.1
#        @$elem.css({
#          'background-color': 'red'
#        })

        @checkCanvas()

#        if @canvasSupported
        @ctx = @$canvas.get(0).getContext('2d')
#        else
#          return false

        @$viewport = @$navigator.find('.mgViewport')

        @bindings()
        @updateViewport()
        @renderScheme()

      checkCanvas: ()->
        elem = @$canvas.get(0)
        @canvasSupported = !!(elem.getContext && elem.getContext('2d'))
        @canvasSupported

      updateViewport: ()->
        log.debug 'update viewport'
        g = @$elem.height()
        h = @$elem.width()
        j = @$elem.scrollTop()
        i = @$elem.scrollLeft()
        @$viewport.css(
          left: i * @ratio
          top: j * @ratio).width(h * @ratio).height g * @ratio

      scrolled: (h)->
        @$elem.offset
          left: -h.left / @ratio
          top: -h.top / @ratio

      bindings: ()->
        @scrolling = false
        @$navigator.click (i)=>
          l = i.pageX - ($(i.target).offset().left) - (@$viewport.width() / 2)
          k = i.pageY - ($(i.target).offset().top) - (@$viewport.height() / 2)
          h = @$navigator.width() - @$viewport.width()
          j = @$navigator.height() - @$viewport.height()
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

        @$elem.scroll ->
          log.debug 'element scrolling'

      renderScheme: ()->
        @ctx.clearRect 0, 0, @ctx.width, @ctx.height
        @$navigator.hide()

        # http://stackoverflow.com/questions/18570765/using-html2canvas-with-highcharts
        svgElements= @$elem.find('.draggable svg, svg.jsplumb-connector')
        log.debug svgElements
        # replace all svgs with a temp canvas
        svgElements.each ()->
          canvas = document.createElement("canvas")
          canvas.setAttribute("class", "screenShotTempCanvas")

          # style
          canvas.style.position = "absolute"
          canvas.style.left = this.style.left
          canvas.style.top = this.style.top

          # convert SVG into a XML string
          xml = (new XMLSerializer()).serializeToString(this)

          # Removing the name space as IE throws an error
#          xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '')

          # draw the SVG onto a canvas
          canvg(canvas, xml)
          $(canvas).insertAfter(this)
          # hide the SVG element
          this.setAttribute("class", "tempHide")
          $(this).hide()

        html2canvas @$elem, {
          allowTaint: true
          onrendered: (i)=>
            j = @$canvas.get(0)
            @ctx.drawImage i, 0, 0, i.width, i.height, 0, 0, j.width, j.height
            @$navigator.show()
            @updating = false
            log.debug 'Html2Canvas end drawing'
        }


#        @$elem.find('.screenShotTempCanvas').remove()
#        @$elem.find('.tempHide').show().removeClass('tempHide');

      destroy: ()->


    minimap
  ]
