
'use strict'

angular
.module('angular-bpmn')
.factory 'bpmnEditor', ['log', 'bpmnUuid', '$compile'
  (log, bpmnUuid, $compile) ->
    class bpmnEditor
      wrapper: null
      container: null
      scope: null
      pallet: null

      constructor: (container, settings)->
        if @scope.settings.engine.status == 'editor'
          @initEditor()

      initEditor: ()->
        if !@pallet
          @wrapper.append($compile('<div class="palette-entries popup" bpmn-editor-palette="settings.editorPallet" settings="settings"></div>')(@scope))
          @pallet = @wrapper.find('.palette-entries')
        @droppableInit()

      droppableInit: ()->
        @wrapper.droppable({
          drop: (event, ui)=>
            offset = @wrapper.offset()
            position =
              left: ui.position.left - @container.position().left + 20
              top: ui.position.top - @container.position().top + 20

            # type update
            #----------------
            type = $(ui.draggable).attr('entry-type')
            data_group = $(ui.draggable).parent().attr('data-group')
            if !type || type == ''
              return

            id = bpmnUuid.gen()
            objects = []
            if data_group == 'swimlane'
              objects.push($.extend(true, angular.copy(@scope.settings.baseObject), {
                id: id
                type:
                  name: 'swimlane'
                draggable: false
                position: position
              }))
              objects.push($.extend(true, angular.copy(@scope.settings.baseObject), {
                id: bpmnUuid.gen()
                parent: id
                type:
                  name: 'swimlane-row'
                draggable: false
              }))
            else
              objects.push($.extend(true, angular.copy(@scope.settings.baseObject), {id: id, type: JSON.parse(type), draggable: true, position: position}))

            @addObjects(objects)
        })

    bpmnEditor
]