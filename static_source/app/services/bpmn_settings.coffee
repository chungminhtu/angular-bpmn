
'use strict'

angular
.module('angular-bpmn')
.factory 'bpmnSettings', () ->

  themeSettings =
    root_path: '/themes'
    list: ['orange', 'minimal']

  engineSettings =
    theme: 'minimal'
    status: 'viewer'
    container:
      resizable: true
      zoom: true
      movable: true
      minimap: false
      theme_selector: true

  instanceSettings =
    DragOptions:
      cursor: 'pointer'
      zIndex: 20
    ConnectionOverlays: [
      [ "Arrow"
        {
          location: 1
          id: "arrow"
          width: 12
          length: 12
          foldback: 0.8
        }
      ]
    ]
    Container: 'container'

  draggableSettings =
    filter: '.ui-resizable-handle'
    grid: [5, 5]
    drag: (event, ui)->
#     $log.debug 'etc dragging'

  connectorStyle =
    strokeStyle: "#000000"
    lineWidth: 2
    outlineWidth: 4

  # свойства точки соединения примитива и линии связи
  pointSettings =
    isSource: true
    isTarget: true
    endpoint: ["Dot", {radius: 1}]
    maxConnections: -1
    paintStyle:
      outlineWidth: 1
    hoverPaintStyle: {}
    connectorStyle: connectorStyle

  connector = ["Flowchart", {
    cornerRadius: 0
    midpoint: 0.5
    minStubLength: 10
    stub:[30, 30]
    gap:0
  }]

#  свойства линии связи
  connectorSettings =
    connector: connector
    isSource: true
    isTarget: true

  sourceSettings =
    filter: ".ep"
    anchor: []
    connector: connector
    connectorStyle: connectorStyle
    endpoint: ["Dot", {radius: 1}]
    maxConnections: -1
    onMaxConnections: (info, e)->
      alert("Maximum connections (" + info.maxConnections + ") reached")

  targetSettings =
    anchor: []
    endpoint: ["Dot", {radius: 1}]
    allowLoopback: false
    uniqueEndpoint: true
    isTarget:true
    maxConnections: -1

  templates =
    event:
      templateUrl: 'event.svg'
      anchor: [
        [ 0.52, 0.05, 0, -1, 0, 2]
        [ 1, 0.52, 1, 0, -2, 0]
        [ 0.52, 1, 0, 1, 0, -2]
        [ 0.1, 0.52, -1, 0, 2, 0]
      ]
      make: ['source','target']
      draggable: true
      size:
        width: 50
        height: 50
    task:
      templateUrl: 'task.svg'
      anchor: [
        [ 0.25, 0.04, 0, -1, 0, 2]
        [ 0.5, 0.04, 0, -1, 0, 2]
        [ 0.75, 0.04, 0, -1, 0, 2]
        [ 0.97, 0.25, 1, 0, -2, 0]
        [ 0.97, 0.5, 1, 0, -2, 0]
        [ 0.97, 0.75, 1, 0, -2, 0]
        [ 0.75, 0.97, 0, 1, 0, -2]
        [ 0.5, 0.97, 0, 1, 0, -2]
        [ 0.25, 0.97, 0, 1, 0, -2]
        [ 0.04, 0.75, -1, 0, 2, 0]
        [ 0.04, 0.5, -1, 0, 2, 0]
        [ 0.04, 0.25, -1, 0, 2, 0]
      ]
      make: ['source','target']
      draggable: true
      size:
        width: 112
        height: 92
    gateway:
      templateUrl: 'gateway.svg'
      anchor: [
        [ 0.5, 0, 0, -1, 0, 2]
        [ 1, 0.5, 1, 0, -2, 0]
        [ 0.5, 1, 0, 1, 0, -2]
        [ 0, 0.5, -1, 0, 2, 0]
      ]
      make: ['source','target']
      draggable: true
      size:
        width: 52
        height: 52
    group:
      template: '<div bpmn-object class="group solid etc draggable" ng-style="{width: data.width, height: data.height}" ng-class="{ dashed : data.style == \'dashed\', solid : data.style == \'solid\' }">
          <div class="title">{{data.title}}</div>
        </div>'
      anchor: []
      make: []
      draggable: true
      size:
        width: 'auto'
        height: 'auto'
      helper: '<div class="bpmn-icon-subprocess-expanded" style="font-size: 33px"></div>'
    swimlane:
      template: '<div bpmn-object class="swimlane etc draggable" ng-style="{ width: data.width }"></div>'
      anchor: []
      make: []
      draggable: true
      size:
        width: 'auto'
        height: 'auto'
      helper: '<div class="bpmn-icon-participant" style="font-size: 33px"></div>'
    'swimlane-row':
      template: '<div bpmn-object class="swimlane-row" ng-style="{width: \'100%\', height: data.height }">
          <div class="header"><div class="text">{{data.title}}</div></div>
        </div>'
      anchor: []
      make: []
#      ignorePosition: true
      draggable: false
      size:
        width: 'auto'
        height: 'auto'
    poster:
      template: '<div bpmn-object class="poster draggable" ng-class="{ \'etc\' : data.draggable }"><img ng-src="{{data.url}}"></div>'
      anchor: []
      make: []
      draggable: true
      size:
        width: 'auto'
        height: 'auto'
    default:
      template: '<div bpmn-object class="dummy etc draggable">shape not found</div>'
      anchor: [
        [ 0.5, 0, 0, -1, 0, 2]
        [ 1, 0.5, 1, 0, -2, 0]
        [ 0.5, 1, 0, 1, 0, -2]
        [ 0, 0.5, -1, 0, 2, 0]
      ]
      make: ['source','target']
      draggable: true
      size:
        width: 50
        height: 50

  baseObject =
    id: 0
    type:
      name: ''
    position:
      top: 0
      left: 0
    status: ''
    error: ''
    title: ''
    description: ''

  template = (id)->
    if templates[id]?
      return templates[id]
    else
      return templates['default']

  {
    theme: themeSettings
    engine: engineSettings
    instance: instanceSettings
    draggable: draggableSettings
    point: pointSettings
    connector: connectorSettings
    source: sourceSettings
    target: targetSettings
    template: template
    templates: templates
    baseObject: baseObject
  }
