
'use strict'

angular
.module('angular-bpmn')
.factory 'bpmnObjectFact', ['bpmnSettings', '$compile', '$rootScope', '$log', '$templateRequest', '$templateCache'
  (bpmnSettings, $compile, $rootScope, $log, $templateRequest, $templateCache) ->
    class schemeObject

      isDebug: true
      parentScope: null

      constructor: (object, parentScope)->
        @parentScope = parentScope
        @log 'object construct'

      appendTo: ()->

      log: ()->
        if !@isDebug?
          return

        msg = ''
        angular.forEach arguments, (arg)->
          msg += arg + ' '
        $log.debug msg

    schemeObject
  ]