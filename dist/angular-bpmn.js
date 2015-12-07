'use strict';
angular.module('angular-bpmn', []);

'use strict';
angular.module('angular-bpmn').service('bpmnMock', function() {
  return {
    scheme1: {
      name: 'Simple scheme of the business process',
      description: '',
      objects: [
        {
          id: 1,
          type: {
            name: 'event',
            start: {
              0: {
                0: true
              }
            }
          },
          position: {
            top: 80,
            left: 50
          },
          status: '',
          error: '',
          title: 'start event',
          description: ''
        }, {
          id: 2,
          type: {
            name: 'task',
            status: '',
            action: ''
          },
          position: {
            top: 60,
            left: 260
          },
          status: '',
          error: '',
          title: 'task',
          description: ''
        }, {
          id: 3,
          type: {
            name: 'event',
            end: {
              simply: {
                top_level: true
              }
            }
          },
          position: {
            top: 80,
            left: 530
          },
          status: '',
          error: '',
          title: 'end event',
          description: ''
        }
      ],
      connectors: [
        {
          id: 1,
          start: {
            object: 1,
            point: 1
          },
          end: {
            object: 2,
            point: 10
          },
          flow_type: "default",
          title: "connector №1"
        }, {
          id: 2,
          start: {
            object: 2,
            point: 4
          },
          end: {
            object: 3,
            point: 3
          },
          flow_type: "default",
          title: "connector №2"
        }
      ]
    }
  };
});

'use strict';
angular.module('angular-bpmn').directive('bpmnObject', [
  '$log', '$timeout', '$templateCache', '$compile', '$templateRequest', '$q', function($log, $timeout, $templateCache, $compile, $templateRequest, $q) {
    return {
      restrict: 'A',
      controller: [
        "$scope", "$element", function($scope, $element) {
          var appedndToElement, batchUpdate, container, generateAnchor, getTemplate, updateStyle;
          container = $($element);
          appedndToElement = (function(_this) {
            return function(element) {
              return container.empty().append($compile(element)($scope));
            };
          })(this);
          getTemplate = function() {
            var template, templateUrl;
            template = $scope.settings.template($scope.object.type.name);
            container.addClass($scope.object.type.name);
            container.css({
              width: template.size.width,
              height: template.size.height
            });
            templateUrl = template.templateUrl;
            if ((templateUrl != null) && templateUrl !== '') {
              templateUrl = $scope.settings.theme.root_path + '/' + $scope.settings.engine.theme + '/' + templateUrl;
              template = $templateCache.get(templateUrl);
              if (template != null) {
                return template.then(function(template) {
                  return appedndToElement(template.data);
                });
              } else {
                $log.warn('template not found in cache, ', templateUrl);
                this.elementPromise = $templateRequest(templateUrl);
                return this.elementPromise.then(function(result) {
                  $templateCache.put(templateUrl, result);
                  return appedndToElement(result);
                });
              }
            } else {
              return $compile(template.template)($scope);
            }
          };
          updateStyle = function() {
            var style;
            style = {
              top: $scope.object.position.top,
              left: $scope.object.position.left
            };
            container.css(style);
            return $scope.instance.repaintEverything();
          };
          batchUpdate = function() {
            return $scope.instance.batch(function() {
              var template;
              $scope.instance.draggable(container, $scope.settings.draggable);
              template = $scope.settings.template($scope.object.type.name);
              if (template.anchor.length === 0) {
                return;
              }
              if ($.inArray('source', template.make) !== -1) {
                $scope.instance.makeSource(container, $.extend($scope.settings.source, {
                  anchor: template.anchor
                }));
              }
              if ($.inArray('target', template.make) !== -1) {
                return $scope.instance.makeTarget(container, $.extend($scope.settings.target, {
                  anchor: template.anchor
                }));
              }
            });
          };
          generateAnchor = function() {
            var anchors, template;
            template = $scope.settings.template($scope.object.type.name);
            anchors = template.anchor;
            if (!anchors || anchors.length === 0) {
              return;
            }
            return angular.forEach(anchors, function(anchor) {
              return $scope.instance.addEndpoint(container, {
                anchor: anchor,
                maxConnections: -1
              }, $scope.settings.point);
            });
          };
          getTemplate();
          updateStyle();
          generateAnchor();
          return batchUpdate();
        }
      ],
      link: function($scope, element, attrs) {}
    };
  }
]);

'use strict';
angular.module('angular-bpmn').factory('bpmnObjectFact', [
  'bpmnSettings', '$compile', '$rootScope', '$log', '$templateRequest', '$templateCache', function(bpmnSettings, $compile, $rootScope, $log, $templateRequest, $templateCache) {
    var schemeObject;
    schemeObject = (function() {
      function schemeObject() {}

      return schemeObject;

    })();
    return schemeObject;
  }
]);

'use strict';
angular.module('angular-bpmn').factory('bpmnScheme', [
  '$rootScope', '$log', 'bpmnUuid', '$compile', 'bpmnSettings', '$templateCache', '$templateRequest', '$q', '$timeout', 'bpmnObjectFact', function($rootScope, $log, bpmnUuid, $compile, bpmnSettings, $templateCache, $templateRequest, $q, $timeout, bpmnObjectFact) {
    var bpmnScheme;
    bpmnScheme = (function() {
      bpmnScheme.prototype.isStarted = false;

      bpmnScheme.prototype.id = null;

      bpmnScheme.prototype.scope = null;

      bpmnScheme.prototype.container = null;

      bpmnScheme.prototype.wrapper = null;

      bpmnScheme.prototype.cache = null;

      bpmnScheme.prototype.style_id = 'bpmn-style-theme';

      bpmnScheme.prototype.wrap_class = 'bpmn-wrapper';

      bpmnScheme.prototype.schemeWatch = null;

      bpmnScheme.prototype.template = '<div ng-repeat="object in scheme.objects" bpmn-object class="draggable etc" ng-class="[object.status]" ready="false"></div>';

      function bpmnScheme(container, settings) {
        var wrapper;
        this.id = bpmnUuid.gen();
        this.container = container;
        wrapper = container.parent('.' + this.wrap_class);
        if (wrapper.length === 0) {
          container.wrap('<div class="' + this.wrap_class + '"></div>');
        }
        this.wrapper = container.parent('.' + this.wrap_class);
        this.scope = $rootScope.$new();
        this.scope.scheme = {};
        this.scope.settings = {};
        this.setSettings(settings);
      }

      bpmnScheme.prototype.setStatus = function() {
        if (this.scope.settings.engine.status === 'editor') {
          return this.container.addClass('editor');
        } else {
          return this.container.addClass('viewer');
        }
      };

      bpmnScheme.prototype.setScheme = function(scheme) {
        if (scheme == null) {
          scheme = this.scope.scheme || {};
        }
        return this.scope.scheme = scheme;
      };

      bpmnScheme.prototype.setSettings = function(settings) {
        var ref;
        if (settings == null) {
          settings = {};
        }
        this.scope.settings = $.extend(true, bpmnSettings, angular.copy(settings));
        if (((ref = this.scope.settings.engine.container) != null ? ref.resizable : void 0) != null) {
          return this.container.resizable({
            minHeight: 200,
            minWidth: 400,
            grid: 10,
            handles: 's'
          });
        }
      };

      bpmnScheme.prototype.loadStyle = function() {
        var file, themeStyle, theme_name;
        theme_name = this.scope.settings.engine.theme;
        file = this.scope.settings.theme.root_path + '/' + theme_name + '/style.css';
        themeStyle = $('link#' + this.style_id + '-' + theme_name);
        if (themeStyle.length === 0) {
          $("<link/>", {
            rel: "stylesheet",
            href: file,
            id: this.style_id + '-' + theme_name
          }).appendTo("head");
        } else {
          themeStyle.attr('href', file);
        }
        $log.info('load style file:', file);
        this.wrapper.removeClass();
        return this.wrapper.addClass(this.wrap_class + ' ' + theme_name);
      };

      bpmnScheme.prototype.cacheTemplates = function() {
        return angular.forEach(this.scope.settings.templates, (function(_this) {
          return function(type) {
            var template, templatePromise, templateUrl;
            if ((type.templateUrl == null) || type.templateUrl === '') {
              return;
            }
            templateUrl = _this.scope.settings.theme.root_path + '/' + _this.scope.settings.engine.theme + '/' + type.templateUrl;
            template = $templateCache.get(templateUrl);
            if (template == null) {
              templatePromise = $templateRequest(templateUrl);
              _this.cache.push(templatePromise);
              return templatePromise.then(function(result) {
                $log.info('load template file:', templateUrl);
                return $templateCache.put(templateUrl, result);
              });
            }
          };
        })(this));
      };

      bpmnScheme.prototype.makeObjects = function() {
        var promise;
        promise = [];
        return angular.forEach(this.scope.scheme.objects, function(object) {
          var obj;
          obj = new bpmnObjectFact(instance, object, scheme, settings);
          scheme.objects[object.id] = obj;
          return promise.push(obj.elementPromise);
        });
      };

      bpmnScheme.prototype.start = function() {
        this.loadStyle();
        this.scope.instance = jsPlumb.getInstance($.extend(true, this.scope.settings.instance, {
          Container: container
        }));
        this.cache = [];
        this.cacheTemplates();
        this.container.addClass('bpmn');
        this.setStatus();
        if (this.schemeWatch) {
          this.schemeWatch();
        }
        return this.schemeWatch = this.scope.$watch('scheme', (function(_this) {
          return function(val, old_val) {
            if (val === old_val) {
              return;
            }
            return _this.restart();
          };
        })(this));
      };

      bpmnScheme.prototype.destroy = function() {
        if (this.schemeWatch) {
          return this.schemeWatch();
        }
      };

      bpmnScheme.prototype.restart = function() {
        if (this.isStarted != null) {
          this.destry();
        }
        return this.start();
      };

      return bpmnScheme;

    })();
    return bpmnScheme;
  }
]);

'use strict';
angular.module('angular-bpmn').service('bpmnSettings', function() {
  var connector, connectorSettings, connectorStyle, draggableSettings, engineSettings, instanceSettings, pointSettings, sourceSettings, targetSettings, template, templates, themeSettings;
  themeSettings = {
    root_path: '/themes',
    list: ['default', 'minimal']
  };
  engineSettings = {
    theme: 'minimal',
    status: 'viewer',
    container: {
      resizable: true
    }
  };
  instanceSettings = {
    DragOptions: {
      cursor: 'pointer',
      zIndex: 20
    },
    ConnectionOverlays: [
      [
        "Arrow", {
          location: 1,
          id: "arrow",
          width: 12,
          length: 12,
          foldback: 0.8
        }
      ]
    ],
    Container: 'container'
  };
  draggableSettings = {
    filter: '.ui-resizable-handle',
    grid: [5, 5],
    drag: function(event, ui) {}
  };
  connectorStyle = {
    strokeStyle: "#000000",
    lineWidth: 2,
    outlineWidth: 4
  };
  pointSettings = {
    isSource: true,
    isTarget: true,
    maxConnections: -1
  };
  connector = [
    "Flowchart", {
      cornerRadius: 0,
      midpoint: 0.5,
      minStubLength: 10,
      stub: [30, 30],
      gap: 0
    }
  ];
  connectorSettings = {
    connector: connector,
    isSource: true,
    isTarget: true
  };
  sourceSettings = {
    filter: ".ep",
    anchor: [],
    connector: connector,
    connectorStyle: connectorStyle,
    endpoint: [
      "Dot", {
        radius: 1
      }
    ],
    maxConnections: -1,
    onMaxConnections: function(info, e) {
      return alert("Maximum connections (" + info.maxConnections + ") reached");
    }
  };
  targetSettings = {
    anchor: [],
    endpoint: [
      "Dot", {
        radius: 1
      }
    ],
    allowLoopback: false,
    uniqueEndpoint: true,
    isTarget: true,
    maxConnections: -1
  };
  templates = {
    event: {
      templateUrl: 'event.svg',
      anchor: [[0.52, 0.05, 0, -1, 0, 2], [1, 0.52, 1, 0, -2, 0], [0.52, 1, 0, 1, 0, -2], [0.1, 0.52, -1, 0, 2, 0]],
      make: ['source', 'target'],
      draggable: true,
      size: {
        width: 50,
        height: 50
      }
    },
    task: {
      templateUrl: 'task.svg',
      anchor: [[0.25, 0.04, 0, -1, 0, 2], [0.5, 0.04, 0, -1, 0, 2], [0.75, 0.04, 0, -1, 0, 2], [0.97, 0.25, 1, 0, -2, 0], [0.97, 0.5, 1, 0, -2, 0], [0.97, 0.75, 1, 0, -2, 0], [0.75, 0.97, 0, 1, 0, -2], [0.5, 0.97, 0, 1, 0, -2], [0.25, 0.97, 0, 1, 0, -2], [0.04, 0.75, -1, 0, 2, 0], [0.04, 0.5, -1, 0, 2, 0], [0.04, 0.25, -1, 0, 2, 0]],
      make: ['source', 'target'],
      draggable: true,
      size: {
        width: 112,
        height: 92
      }
    },
    gateway: {
      templateUrl: 'gateway.svg',
      anchor: [[0.5, 0, 0, -1, 0, 2], [1, 0.5, 1, 0, -2, 0], [0.5, 1, 0, 1, 0, -2], [0, 0.5, -1, 0, 2, 0]],
      make: ['source', 'target'],
      draggable: true,
      size: {
        width: 52,
        height: 52
      }
    },
    group: {
      template: '<div scheme-object class="group etc draggable" ng-style="{width: data.width, height: data.height}" ng-class="{ dashed : data.style == \'dashed\', solid : data.style == \'solid\' }"> <div class="title">{{data.title}}</div> </div>',
      anchor: [],
      make: [],
      draggable: true
    },
    swimlane: {
      template: '<div scheme-object class="swimlane etc draggable" ng-style="{ width: data.width }"></div>',
      anchor: [],
      make: [],
      draggable: true
    },
    'swimlane-row': {
      template: '<div scheme-object class="swimlane-row" ng-style="{width: \'100%\', height: data.height }"> <div class="header"><div class="text">{{data.title}}</div></div> </div>',
      anchor: [],
      make: [],
      draggable: false
    },
    poster: {
      template: '<div scheme-object class="poster draggable" ng-class="{ \'etc\' : data.draggable }"><img ng-src="{{data.url}}"></div>',
      anchor: [],
      make: [],
      draggable: true
    },
    "default": {
      template: '<div scheme-object class="dummy etc draggable">shape not found</div>',
      anchor: [[0.5, 0, 0, -1, 0, 2], [1, 0.5, 1, 0, -2, 0], [0.5, 1, 0, 1, 0, -2], [0, 0.5, -1, 0, 2, 0]],
      make: ['source', 'target'],
      draggable: true,
      size: {
        width: 40,
        height: 40
      }
    }
  };
  template = function(id) {
    if (templates[id] != null) {
      return templates[id];
    } else {
      return templates['default'];
    }
  };
  return {
    theme: themeSettings,
    engine: engineSettings,
    instance: instanceSettings,
    draggable: draggableSettings,
    point: pointSettings,
    connector: connectorSettings,
    source: sourceSettings,
    target: targetSettings,
    template: template,
    templates: templates
  };
});

'use strict';
angular.module('angular-bpmn').factory('bpmnUuid', function() {
  var uuid;
  uuid = (function() {
    function uuid() {}

    uuid.generator = function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var d, q, r;
        d = new Date().getTime();
        r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        q = null;
        if (c === 'x') {
          q = r;
        } else {
          q = r & 0x3 | 0x8;
        }
        return q.toString(16);
      });
    };

    uuid.gen = function() {
      return this.generator();
    };

    return uuid;

  })();
  return uuid;
});
