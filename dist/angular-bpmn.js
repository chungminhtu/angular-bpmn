'use strict';
angular.module('angular-bpmn', []);

angular.module('angular-bpmn').run([
  '$rootScope', (function(_this) {
    return function($rootScope) {
      return $rootScope.runMode = 'debug';
    };
  })(this)
]);

'use strict';
angular.module('angular-bpmn').service('log', [
  '$log', '$rootScope', function($log, $rootScope) {
    return {
      debug: function() {
        if ($rootScope.runMode !== 'debug') {
          return;
        }
        return $log.debug.apply(self, arguments);
      },
      error: function() {
        return $log.error.apply(self, arguments);
      }
    };
  }
]);

'use strict';
angular.module('angular-bpmn').service('bpmnMock', function() {
  return {
    scheme1: {
      name: 'Simply bpmn scheme',
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
    },
    scheme2: {
      name: 'Parallel Event-Based Gateway',
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
          title: 'message 1',
          description: ''
        }, {
          id: 2,
          type: {
            name: 'event',
            start: {
              0: {
                0: true
              }
            }
          },
          position: {
            top: 240,
            left: 50
          },
          status: '',
          error: '',
          title: 'message 2',
          description: ''
        }, {
          id: 3,
          type: {
            name: 'gateway',
            base: 'data',
            status: 'xor'
          },
          position: {
            top: 160,
            left: 190
          },
          status: '',
          error: '',
          title: '',
          description: ''
        }, {
          id: 4,
          type: {
            name: 'task'
          },
          position: {
            top: 140,
            left: 370
          },
          status: '',
          error: '',
          title: 'task',
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
            object: 3,
            point: 0
          },
          flow_type: "default",
          title: "connector №1"
        }, {
          id: 2,
          start: {
            object: 2,
            point: 1
          },
          end: {
            object: 3,
            point: 2
          },
          flow_type: "default",
          title: "connector №2"
        }, {
          id: 2,
          start: {
            object: 3,
            point: 1
          },
          end: {
            object: 4,
            point: 10
          },
          flow_type: "default",
          title: "connector №3"
        }
      ]
    },
    scheme3: {
      name: 'Base scheme',
      description: '',
      objects: [
        {
          id: 1,
          type: {
            name: 'event',
            start: {
              simply: {
                top_level: true
              }
            }
          },
          parent: 0,
          position: {
            top: 210,
            left: 120
          },
          status: '',
          error: '',
          title: '',
          description: ''
        }, {
          id: 2,
          type: {
            name: 'task'
          },
          parent: 0,
          position: {
            top: 190,
            left: 220
          },
          status: '',
          error: '',
          title: 'Оформить заявку',
          description: ''
        }, {
          id: 3,
          type: {
            name: 'task'
          },
          parent: 0,
          position: {
            top: 190,
            left: 370
          },
          status: '',
          error: '',
          title: 'Рассмотреть заявку',
          description: ''
        }, {
          id: 4,
          type: {
            name: 'gateway'
          },
          parent: 0,
          position: {
            top: 210,
            left: 540
          },
          status: '',
          error: '',
          title: 'Одобрена?',
          description: ''
        }, {
          id: 5,
          type: {
            name: 'task'
          },
          parent: 0,
          position: {
            top: 190,
            left: 650
          },
          status: '',
          error: '',
          title: 'Выделить машину',
          description: ''
        }, {
          id: 6,
          type: {
            name: 'task'
          },
          parent: 0,
          position: {
            top: 390,
            left: 510
          },
          status: '',
          error: '',
          title: 'Заявка отклоннена',
          description: ''
        }, {
          id: 7,
          type: {
            name: 'event',
            end: {
              simply: {
                top_level: true
              }
            }
          },
          parent: 0,
          position: {
            top: 550,
            left: 540
          },
          status: '',
          error: '',
          title: 'Заявка отклонена',
          description: ''
        }, {
          id: 8,
          type: {
            name: 'gateway'
          },
          parent: 0,
          position: {
            top: 210,
            left: 810
          },
          status: '',
          error: '',
          title: 'Выделена?',
          description: ''
        }, {
          id: 9,
          type: {
            name: 'gateway',
            status: 'parallel'
          },
          parent: 0,
          position: {
            top: 210,
            left: 930
          },
          status: '',
          error: '',
          title: '',
          description: ''
        }, {
          id: 10,
          type: {
            name: 'task'
          },
          parent: 0,
          position: {
            top: 100,
            left: 1050
          },
          status: '',
          error: '',
          title: 'Машина выделена',
          description: ''
        }, {
          id: 11,
          type: {
            name: 'task'
          },
          parent: 0,
          position: {
            top: 290,
            left: 1050
          },
          status: '',
          error: '',
          title: 'Выполнить рейс',
          description: ''
        }, {
          id: 12,
          type: {
            name: 'gateway',
            status: 'parallel'
          },
          parent: 0,
          position: {
            top: 210,
            left: 1200
          },
          status: '',
          error: '',
          title: '',
          description: ''
        }, {
          id: 13,
          type: {
            name: 'event',
            end: {
              simply: {
                top_level: true
              }
            }
          },
          parent: 0,
          position: {
            top: 210,
            left: 1340
          },
          status: '',
          error: '',
          title: 'Заявка выполнена',
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
          title: ""
        }, {
          id: 2,
          start: {
            object: 2,
            point: 4
          },
          end: {
            object: 3,
            point: 10
          },
          flow_type: "default",
          title: ""
        }, {
          id: 3,
          start: {
            object: 3,
            point: 4
          },
          end: {
            object: 4,
            point: 3
          },
          flow_type: "default",
          title: ""
        }, {
          id: 4,
          start: {
            object: 4,
            point: 2
          },
          end: {
            object: 6,
            point: 1
          },
          flow_type: "default",
          title: "Нет"
        }, {
          id: 4,
          start: {
            object: 4,
            point: 1
          },
          end: {
            object: 5,
            point: 10
          },
          flow_type: "default",
          title: "Да"
        }, {
          id: 5,
          start: {
            object: 6,
            point: 7
          },
          end: {
            object: 7,
            point: 0
          },
          flow_type: "default",
          title: ""
        }, {
          id: 6,
          start: {
            object: 5,
            point: 4
          },
          end: {
            object: 8,
            point: 3
          },
          flow_type: "default",
          title: ""
        }, {
          id: 7,
          start: {
            object: 8,
            point: 0
          },
          end: {
            object: 3,
            point: 1
          },
          flow_type: "default",
          title: "Нет"
        }, {
          id: 8,
          start: {
            object: 8,
            point: 1
          },
          end: {
            object: 9,
            point: 3
          },
          flow_type: "default",
          title: "Да"
        }, {
          id: 9,
          start: {
            object: 9,
            point: 1
          },
          end: {
            object: 10,
            point: 10
          },
          flow_type: "default",
          title: ""
        }, {
          id: 10,
          start: {
            object: 9,
            point: 1
          },
          end: {
            object: 11,
            point: 10
          },
          flow_type: "default",
          title: ""
        }, {
          id: 11,
          start: {
            object: 10,
            point: 4
          },
          end: {
            object: 12,
            point: 0
          },
          flow_type: "default",
          title: ""
        }, {
          id: 12,
          start: {
            object: 11,
            point: 4
          },
          end: {
            object: 12,
            point: 2
          },
          flow_type: "default",
          title: ""
        }, {
          id: 13,
          start: {
            object: 12,
            point: 1
          },
          end: {
            object: 13,
            point: 3
          },
          flow_type: "default",
          title: ""
        }
      ]
    },
    scheme4: {
      name: 'Base scheme with grouping',
      description: '',
      objects: [
        {
          id: 1,
          type: {
            name: 'event',
            start: {
              simply: {
                top_level: true
              }
            }
          },
          position: {
            top: 80,
            left: 50
          },
          status: '',
          error: '',
          title: '',
          description: ''
        }, {
          id: 2,
          type: {
            name: 'task'
          },
          parent: 14,
          position: {
            top: 40,
            left: 40
          },
          status: '',
          error: '',
          title: 'Оформить заявку',
          description: ''
        }, {
          id: 3,
          type: {
            name: 'task'
          },
          parent: 15,
          position: {
            top: 40,
            left: 40
          },
          status: '',
          error: '',
          title: 'Рассмотреть заявку',
          description: ''
        }, {
          id: 4,
          type: {
            name: 'gateway'
          },
          position: {
            top: 290,
            left: 370
          },
          status: '',
          error: '',
          title: 'Одобрена?',
          description: ''
        }, {
          id: 5,
          type: {
            name: 'task'
          },
          parent: 14,
          position: {
            top: 40,
            left: 200
          },
          status: '',
          error: '',
          title: 'Заявка отклонена',
          description: ''
        }, {
          id: 6,
          type: {
            name: 'event',
            end: {
              simply: {
                top_level: true
              }
            }
          },
          parent: 14,
          position: {
            top: 60,
            left: 380
          },
          status: '',
          error: '',
          title: 'Заявка отклонена',
          description: ''
        }, {
          id: 7,
          type: {
            name: 'task'
          },
          parent: 16,
          position: {
            top: 30,
            left: 30
          },
          status: '',
          error: '',
          title: 'Выделить машину',
          description: ''
        }, {
          id: 8,
          type: {
            name: 'gateway'
          },
          parent: 16,
          position: {
            top: 50,
            left: 210
          },
          status: '',
          error: '',
          title: 'Выделена?',
          description: ''
        }, {
          id: 9,
          type: {
            name: 'gateway',
            status: 'parallel'
          },
          parent: 16,
          position: {
            top: 50,
            left: 340
          },
          status: '',
          error: '',
          title: '',
          description: ''
        }, {
          id: 10,
          type: {
            name: 'task'
          },
          parent: 14,
          position: {
            top: 40,
            left: 480
          },
          status: '',
          error: '',
          title: 'Машина выделена',
          description: ''
        }, {
          id: 11,
          type: {
            name: 'gateway',
            status: 'parallel'
          },
          position: {
            top: 80,
            left: 780
          },
          status: '',
          error: '',
          title: '',
          description: ''
        }, {
          id: 12,
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
            left: 890
          },
          status: '',
          error: '',
          title: 'Заявка выполнена',
          description: ''
        }, {
          id: 13,
          type: {
            name: 'task'
          },
          parent: 16,
          position: {
            top: 30,
            left: 440
          },
          status: '',
          error: '',
          title: 'Выполнить рейс',
          description: ''
        }, {
          id: 14,
          type: {
            name: 'group'
          },
          position: {
            top: 20,
            left: 140
          },
          width: '614px',
          height: '170px',
          status: '',
          error: '',
          title: 'Заказчик',
          description: '',
          style: 'solid'
        }, {
          id: 15,
          type: {
            name: 'group'
          },
          position: {
            top: 230,
            left: 140
          },
          width: '186px',
          height: '176px',
          status: '',
          error: '',
          title: 'Канцелярия',
          description: '',
          style: 'solid'
        }, {
          id: 16,
          type: {
            name: 'group'
          },
          position: {
            top: 430,
            left: 310
          },
          width: '588px',
          height: '168px',
          status: '',
          error: '',
          title: 'Гараж',
          description: '',
          style: 'solid'
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
          title: ""
        }, {
          id: 2,
          start: {
            object: 2,
            point: 7
          },
          end: {
            object: 3,
            point: 1
          },
          flow_type: "default",
          title: ""
        }, {
          id: 3,
          start: {
            object: 3,
            point: 4
          },
          end: {
            object: 4,
            point: 3
          },
          flow_type: "default",
          title: ""
        }, {
          id: 4,
          start: {
            object: 4,
            point: 0
          },
          end: {
            object: 5,
            point: 7
          },
          flow_type: "default",
          title: "нет"
        }, {
          id: 5,
          start: {
            object: 5,
            point: 4
          },
          end: {
            object: 6,
            point: 3
          },
          flow_type: "default",
          title: ""
        }, {
          id: 6,
          start: {
            object: 4,
            point: 2
          },
          end: {
            object: 7,
            point: 1
          },
          flow_type: "default",
          title: "да"
        }, {
          id: 7,
          start: {
            object: 7,
            point: 4
          },
          end: {
            object: 8,
            point: 3
          },
          flow_type: "default",
          title: ""
        }, {
          id: 7,
          start: {
            object: 8,
            point: 2
          },
          end: {
            object: 3,
            point: 7
          },
          flow_type: "default",
          title: "нет"
        }, {
          id: 8,
          start: {
            object: 8,
            point: 1
          },
          end: {
            object: 9,
            point: 3
          },
          flow_type: "default",
          title: "да"
        }, {
          id: 9,
          start: {
            object: 9,
            point: 0
          },
          end: {
            object: 10,
            point: 7
          },
          flow_type: "default",
          title: ""
        }, {
          id: 10,
          start: {
            object: 10,
            point: 4
          },
          end: {
            object: 11,
            point: 3
          },
          flow_type: "default",
          title: ""
        }, {
          id: 11,
          start: {
            object: 11,
            point: 1
          },
          end: {
            object: 12,
            point: 3
          },
          flow_type: "default",
          title: ""
        }, {
          id: 12,
          start: {
            object: 13,
            point: 1
          },
          end: {
            object: 11,
            point: 2
          },
          flow_type: "default",
          title: ""
        }, {
          id: 13,
          start: {
            object: 9,
            point: 1
          },
          end: {
            object: 13,
            point: 10
          },
          flow_type: "default",
          title: ""
        }
      ]
    },
    scheme5: {
      name: 'Base scheme with swimlane',
      description: '',
      objects: [
        {
          id: 1,
          type: {
            name: 'event',
            start: {
              simply: {
                top_level: true
              }
            }
          },
          parent: 15,
          position: {
            top: 70,
            left: 120
          },
          status: '',
          error: '',
          title: '',
          description: ''
        }, {
          id: 2,
          type: {
            name: 'task'
          },
          parent: 15,
          position: {
            top: 50,
            left: 240
          },
          status: '',
          error: '',
          title: 'Оформить заявку',
          description: ''
        }, {
          id: 3,
          type: {
            name: 'task'
          },
          parent: 16,
          position: {
            top: 60,
            left: 240
          },
          status: '',
          error: '',
          title: 'Рассмотреть заявку',
          description: ''
        }, {
          id: 4,
          type: {
            name: 'gateway'
          },
          parent: 16,
          position: {
            top: 80,
            left: 420
          },
          status: '',
          error: '',
          title: 'Одобрена?',
          description: ''
        }, {
          id: 5,
          type: {
            name: 'task'
          },
          parent: 15,
          position: {
            top: 50,
            left: 390
          },
          status: '',
          error: '',
          title: 'Заявка отклонена',
          description: ''
        }, {
          id: 6,
          type: {
            name: 'event',
            end: {
              simply: {
                top_level: true
              }
            }
          },
          parent: 15,
          position: {
            top: 70,
            left: 570
          },
          status: '',
          error: '',
          title: 'Заявка отклонена',
          description: ''
        }, {
          id: 7,
          type: {
            name: 'task'
          },
          parent: 17,
          position: {
            top: 60,
            left: 390
          },
          status: '',
          error: '',
          title: 'Выделить машину',
          description: ''
        }, {
          id: 8,
          type: {
            name: 'gateway'
          },
          parent: 17,
          position: {
            top: 80,
            left: 570
          },
          status: '',
          error: '',
          title: 'Выделена?',
          description: ''
        }, {
          id: 9,
          type: {
            name: 'gateway',
            status: 'parallel'
          },
          parent: 17,
          position: {
            top: 80,
            left: 690
          },
          status: '',
          error: '',
          title: '',
          description: ''
        }, {
          id: 10,
          type: {
            name: 'task'
          },
          parent: 15,
          position: {
            top: 50,
            left: 660
          },
          status: '',
          error: '',
          title: 'Машина выделена',
          description: ''
        }, {
          id: 11,
          type: {
            name: 'gateway',
            status: 'parallel'
          },
          parent: 15,
          position: {
            top: 70,
            left: 830
          },
          status: '',
          error: '',
          title: '',
          description: ''
        }, {
          id: 12,
          type: {
            name: 'event',
            end: {
              simply: {
                top_level: true
              }
            }
          },
          parent: 15,
          position: {
            top: 70,
            left: 940
          },
          status: '',
          error: '',
          title: 'Заявка выполнена',
          description: ''
        }, {
          id: 13,
          type: {
            name: 'task'
          },
          parent: 17,
          position: {
            top: 60,
            left: 800
          },
          status: '',
          error: '',
          title: 'Выполнить рейс',
          description: ''
        }, {
          id: 14,
          type: {
            name: 'swimlane'
          },
          position: {
            top: 10,
            left: 10
          },
          width: '1040px',
          height: '',
          status: '',
          error: '',
          title: '',
          description: '',
          style: ''
        }, {
          id: 15,
          type: {
            name: 'swimlane-row'
          },
          parent: 14,
          position: {
            top: 0,
            left: 0
          },
          width: '100%',
          height: '200px',
          status: '',
          error: '',
          title: 'Заказчик',
          description: '',
          style: ''
        }, {
          id: 16,
          type: {
            name: 'swimlane-row'
          },
          parent: 14,
          position: {
            top: 0,
            left: 0
          },
          width: '100%',
          height: '200px',
          status: '',
          error: '',
          title: 'Канцелярия',
          description: '',
          style: ''
        }, {
          id: 17,
          type: {
            name: 'swimlane-row'
          },
          parent: 14,
          position: {
            top: 0,
            left: 0
          },
          width: '100%',
          height: '200px',
          status: '',
          error: '',
          title: 'Гараж',
          description: '',
          style: ''
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
          title: ""
        }, {
          id: 2,
          start: {
            object: 2,
            point: 7
          },
          end: {
            object: 3,
            point: 1
          },
          flow_type: "default",
          title: ""
        }, {
          id: 3,
          start: {
            object: 3,
            point: 4
          },
          end: {
            object: 4,
            point: 3
          },
          flow_type: "default",
          title: ""
        }, {
          id: 4,
          start: {
            object: 4,
            point: 0
          },
          end: {
            object: 5,
            point: 7
          },
          flow_type: "default",
          title: "нет"
        }, {
          id: 5,
          start: {
            object: 5,
            point: 4
          },
          end: {
            object: 6,
            point: 3
          },
          flow_type: "default",
          title: ""
        }, {
          id: 6,
          start: {
            object: 4,
            point: 2
          },
          end: {
            object: 7,
            point: 1
          },
          flow_type: "default",
          title: "да"
        }, {
          id: 7,
          start: {
            object: 7,
            point: 4
          },
          end: {
            object: 8,
            point: 3
          },
          flow_type: "default",
          title: ""
        }, {
          id: 7,
          start: {
            object: 8,
            point: 2
          },
          end: {
            object: 3,
            point: 7
          },
          flow_type: "default",
          title: "нет"
        }, {
          id: 8,
          start: {
            object: 8,
            point: 1
          },
          end: {
            object: 9,
            point: 3
          },
          flow_type: "default",
          title: "да"
        }, {
          id: 9,
          start: {
            object: 9,
            point: 0
          },
          end: {
            object: 10,
            point: 7
          },
          flow_type: "default",
          title: ""
        }, {
          id: 10,
          start: {
            object: 10,
            point: 4
          },
          end: {
            object: 11,
            point: 3
          },
          flow_type: "default",
          title: ""
        }, {
          id: 11,
          start: {
            object: 11,
            point: 1
          },
          end: {
            object: 12,
            point: 3
          },
          flow_type: "default",
          title: ""
        }, {
          id: 12,
          start: {
            object: 13,
            point: 1
          },
          end: {
            object: 11,
            point: 2
          },
          flow_type: "default",
          title: ""
        }, {
          id: 13,
          start: {
            object: 9,
            point: 1
          },
          end: {
            object: 13,
            point: 10
          },
          flow_type: "default",
          title: ""
        }
      ]
    }
  };
});

'use strict';
angular.module('angular-bpmn').directive('bpmnObject', [
  'log', '$timeout', '$templateCache', '$compile', '$templateRequest', '$q', function(log, $timeout, $templateCache, $compile, $templateRequest, $q) {
    return {
      restrict: 'A',
      controller: [
        "$scope", "$element", function($scope, $element) {
          var childs, container, updateStyle;
          container = $($element);
          childs = [];
          switch ($scope.data.type.name) {
            case 'poster':
              container.find('img').on('dragstart', function(e) {
                return e.preventDefault();
              });
              break;
            case 'group':
              if (!(($scope.data.resizable != null) && $scope.data.resizable) && $scope.object.settings.engine.status !== 'editor') {
                break;
              }
              container.resizable({
                minHeight: 100,
                minWidth: 100,
                grid: 10,
                handles: "all",
                start: function(event, ui) {
                  return childs = $scope.object.getAllChilds();
                },
                stop: function(event, ui) {
                  return $scope.instance.repaintEverything();
                },
                resize: function(event, ui) {
                  angular.forEach(childs, function(child, ch_key) {
                    var h, v;
                    h = child.position.left + child.size.width;
                    v = child.position.top + child.size.height;
                    if (container.width() <= h + 20) {
                      container.css('width', h + 20);
                    }
                    if (container.height() <= v + 20) {
                      return container.css('height', v + 20);
                    }
                  });
                  return $scope.instance.repaintEverything();
                }
              });
              break;
            case 'swimlane':
              if (!(($scope.data.resizable != null) && $scope.data.resizable) && $scope.object.settings.engine.status !== 'editor') {
                break;
              }
              container.resizable({
                minHeight: 200,
                minWidth: 400,
                grid: 10,
                handles: 'e',
                start: function() {
                  childs = $scope.object.getAllChilds();
                  return $scope.instance.repaintEverything();
                },
                resize: function() {
                  angular.forEach(childs, function(child) {
                    var h;
                    if (child.data.type === 'swimlane-row') {
                      return;
                    }
                    h = child.position.left + child.size.width;
                    if (container.width() <= h + 20) {
                      return container.css('width', h + 20);
                    }
                  });
                  return $scope.instance.repaintEverything();
                }
              });
              break;
            case 'swimlane-row':
              if (!(($scope.data.resizable != null) && $scope.data.resizable) && $scope.object.settings.engine.status !== 'editor') {
                break;
              }
              container.resizable({
                minHeight: 200,
                minWidth: 400,
                grid: 10,
                handles: 's',
                start: function() {
                  childs = $scope.object.getAllChilds();
                  return $scope.instance.repaintEverything();
                },
                resize: function() {
                  angular.forEach(childs, function(child) {
                    var v;
                    v = child.position.top + child.size.height;
                    if (container.height() <= v + 20) {
                      return container.css('height', v + 20);
                    }
                  });
                  return $scope.instance.repaintEverything();
                }
              });
          }
          updateStyle = function() {
            var style;
            style = {
              top: $scope.data.position.top,
              left: $scope.data.position.left
            };
            container.css(style);
            return $scope.instance.repaintEverything();
          };
          $scope.$watch('data.position', function(val, old_val) {
            if (val === old_val) {
              return;
            }
            return updateStyle();
          });
          return updateStyle();
        }
      ],
      link: function($scope, element, attrs) {}
    };
  }
]);

'use strict';
angular.module('angular-bpmn').factory('bpmnObjectFact', [
  'bpmnSettings', '$compile', '$rootScope', 'log', '$templateRequest', '$templateCache', function(bpmnSettings, $compile, $rootScope, log, $templateRequest, $templateCache) {
    var schemeObject;
    schemeObject = (function() {
      schemeObject.prototype.id = null;

      schemeObject.prototype.isDebug = true;

      schemeObject.prototype.parentScope = null;

      schemeObject.prototype.data = null;

      schemeObject.prototype.anchor = null;

      schemeObject.prototype.make = null;

      schemeObject.prototype.draggable = null;

      schemeObject.prototype.templateUrl = null;

      schemeObject.prototype.template = null;

      schemeObject.prototype.element = null;

      schemeObject.prototype.container = null;

      schemeObject.prototype.size = null;

      schemeObject.prototype.points = null;

      schemeObject.prototype.settings = null;

      schemeObject.prototype.childs = null;

      schemeObject.prototype.position = {
        top: 0,
        left: 0
      };

      schemeObject.prototype.isParent = false;

      function schemeObject(data, parentScope) {
        var tpl;
        log.debug('object construct');
        this.parentScope = parentScope;
        this.settings = parentScope.settings;
        this.data = data;
        tpl = bpmnSettings.template(data.type.name);
        this.anchor = tpl.anchor;
        this.size = tpl.size;
        this.make = tpl.make;
        this.draggable = tpl.draggable;
        this.templateUrl = tpl.templateUrl || null;
        this.template = tpl.template || null;
        this.childs = [];
        this.position = {
          top: data.position.top,
          left: data.position.left
        };
        this.templateUpdate();
      }

      schemeObject.prototype.templateUpdate = function() {
        var appendToElement, childScope, template, templateUrl;
        childScope = $rootScope.$new();
        childScope.data = this.data;
        childScope.instance = this.parentScope.instance;
        childScope.object = this;
        appendToElement = (function(_this) {
          return function(element) {
            return _this.element.empty().append(element);
          };
        })(this);
        if ((this.templateUrl != null) && this.templateUrl !== '') {
          if (this.element == null) {
            this.element = $compile('<div bpmn-object class="' + this.data.type.name + ' draggable etc" ng-class="[data.status]"></div>')(childScope);
          }
          templateUrl = this.settings.theme.root_path + '/' + this.settings.engine.theme + '/' + this.templateUrl;
          template = $templateCache.get(templateUrl);
          if (template == null) {
            log.debug('template not found', templateUrl);
            this.elementPromise = $templateRequest(templateUrl);
            return this.elementPromise.then(function(result) {
              appendToElement($compile(result)(childScope));
              return $templateCache.put(templateUrl, result);
            });
          } else {
            return appendToElement($compile(template)(childScope));
          }
        } else {
          if (this.element == null) {
            return this.element = $compile(this.template)(childScope);
          }
        }
      };

      schemeObject.prototype.generateAnchor = function(options) {
        var points;
        if (!this.anchor || this.anchor.length === 0) {
          return;
        }
        if (!this.element) {
          log.debug('generateAnchor: @element is null', this);
          return;
        }
        points = [];
        angular.forEach(this.anchor, (function(_this) {
          return function(anchor) {
            var point;
            point = _this.parentScope.instance.addEndpoint(_this.element, {
              anchor: anchor,
              maxConnections: -1
            }, options);
            if (points.indexOf(point) === -1) {
              return points.push(point);
            }
          };
        })(this));
        return this.points = points;
      };

      schemeObject.prototype.appendTo = function(container, options) {
        if (!this.element || this.element === '') {
          log.debug('appendTo: @element is null', this);
          return;
        }
        this.container = container;
        container.append(this.element);
        if (this.size) {
          $(this.element).css({
            width: this.size.width,
            height: this.size.height
          });
        } else {
          log.error('@size is null, element:', this.element);
        }
        this.checkParent();
        this.generateAnchor(options);
        return this.setDraggable(this.draggable);
      };

      schemeObject.prototype.select = function(tr) {
        if (tr) {
          return $(this.element).addClass("selected");
        } else {
          return $(this.element).removeClass("selected");
        }
      };

      schemeObject.prototype.getId = function() {
        if (this.id == null) {
          this.id = $(this.element).attr('id');
        }
        return this.id;
      };

      schemeObject.prototype.setDraggable = function(tr) {
        return this.parentScope.instance.setDraggable($(this.element), tr);
      };

      schemeObject.prototype.group = function(groupId) {
        return this.parentScope.instance.addToPosse(this.getId(), {
          id: groupId,
          active: true
        });
      };

      schemeObject.prototype.ungroup = function(groupId) {
        return this.parentScope.instance.removeFromPosse(this.getId(), groupId);
      };

      schemeObject.prototype.checkParent = function() {
        var parent, parentId;
        if ((this.data.parent == null) || this.data.parent === '') {
          if ((this.data.draggable != null) && this.data.draggable || this.settings.engine.status === 'editor') {
            this.parentScope.instance.draggable(this.element, $.extend({}, this.settings.draggable, {
              stop: (function(_this) {
                return function(event) {
                  _this.position.left = event.pos[0];
                  return _this.position.top = event.pos[1];
                };
              })(this)
            }));
          }
          return;
        }
        parent = null;
        angular.forEach(this.parentScope.intScheme.objects, (function(_this) {
          return function(obj) {
            if (obj.data.id === _this.data.parent) {
              return parent = obj;
            }
          };
        })(this));
        if (parent == null) {
          return;
        }
        this.element.removeClass("etc");
        parentId = this.setParent(parent);
        if ((this.data.draggable != null) && this.data.draggable || this.settings.engine.status === 'editor') {
          return this.parentScope.instance.draggable(this.element, $.extend({}, this.settings.draggable, {
            containment: parentId,
            stop: (function(_this) {
              return function(event) {
                _this.position.left = event.pos[0];
                _this.position.top = event.pos[1];
                return _this.parentScope.instance.repaintEverything();
              };
            })(this)
          }));
        }
      };

      schemeObject.prototype.setParent = function(parent) {
        var id, parent_element;
        if (parent == null) {
          return;
        }
        parent_element = parent.element;
        this.parentScope.instance.setParent(this.element, parent_element);
        id = parent_element.attr('id');
        parent.isParent = true;
        if ($.inArray(this.data, parent.childs) === -1) {
          parent.childs.push(this);
        }
        if (parent_element.hasClass(id)) {
          return id;
        }
        parent_element.addClass(id).removeClass("etc");
        if ((this.data.draggable != null) && this.data.draggable || this.settings.engine.status === 'editor') {
          return this.parentScope.instance.draggable(parent_element, $.extend({}, this.settings.draggable, {
            drag: (function(_this) {
              return function(event, ui) {
                return _this.parentScope.instance.repaintEverything();
              };
            })(this),
            stop: (function(_this) {
              return function(event) {
                _this.position.left = event.pos[0];
                _this.position.top = event.pos[1];
                return _this.parentScope.instance.repaintEverything();
              };
            })(this)
          }));
        }
      };

      schemeObject.prototype.removeParent = function() {};

      schemeObject.prototype.getAllChilds = function() {
        var childs;
        childs = [];
        angular.forEach(this.childs, function(child) {
          var tch;
          childs.push(child);
          tch = child.getAllChilds();
          if (tch.length > 0) {
            return childs = childs.concat(tch);
          }
        });
        return childs;
      };

      schemeObject.prototype.remove = function() {
        var id;
        id = this.getId();
        if (id == null) {
          return;
        }
        log.debug('remove: ', id);
        this.parentScope.instance.detachAllConnections(this.element).empty(id).remove(id);
        this.childs = null;
        this.isParent = false;
        this.container = null;
        this.element = null;
        return this.points = null;
      };

      return schemeObject;

    })();
    return schemeObject;
  }
]);

'use strict';
angular.module('angular-bpmn').directive('bpmnPalette', [
  'log', '$timeout', '$templateCache', '$compile', '$templateRequest', '$q', function(log, $timeout, $templateCache, $compile, $templateRequest, $q) {
    return {
      restrict: 'A',
      scope: {
        bpmnPalette: '='
      },
      template: '<div class="group" ng-repeat="group in bpmnPalette.groups" data-group="{{::group.name}}"> <div class="entry" ng-repeat="entry in group.items" ng-class="[entry.class]" bpmn-palette-draggable="entry" entry-type="{{entry.type}}" settings="bpmnPalette.settings" data-help="{{entry.tooltip}}"></div>',
      link: function($scope, element, attrs) {}
    };
  }
]);

'use strict';
angular.module('angular-bpmn').directive('bpmnPaletteDraggable', [
  'log', '$timeout', '$templateCache', '$compile', '$templateRequest', function(log, $timeout, $templateCache, $compile, $templateRequest) {
    return {
      restrict: 'A',
      scope: {
        bpmnPaletteDraggable: '=',
        settings: '=settings'
      },
      link: function($scope, element, attrs) {
        var container, data, elementPromise, template;
        container = $(element);
        data = $scope.bpmnPaletteDraggable;
        template = {};
        if (data.shape.helper) {
          template = $compile(data.shape.helper)($scope);
        } else if (data.shape.templateUrl) {
          elementPromise = $templateRequest($scope.settings.theme.root_path + '/' + $scope.settings.engine.theme + '/' + data.shape.templateUrl);
          elementPromise.then(function(result) {
            return template = $compile('<div ng-class="[bpmnPaletteDraggable.type.name]">' + result + '</div>')($scope);
          });
        }
        return container.draggable({
          helper: function() {
            return template;
          },
          appendTo: "body"
        });
      }
    };
  }
]);

'use strict';
angular.module('angular-bpmn').factory('bpmnPanning', [
  'log', '$compile', '$timeout', function(log, $compile, $timeout) {
    var bpmnPanning;
    bpmnPanning = (function() {
      bpmnPanning.prototype.container = null;

      bpmnPanning.prototype.scope = null;

      bpmnPanning.prototype.wrapper = null;

      function bpmnPanning(container, scope, wrapper) {
        this.container = container;
        this.scope = scope;
        this.wrapper = wrapper;
        this.init();
      }

      bpmnPanning.prototype.init = function() {
        var delta, drag, template;
        template = $compile('<div class="panning-cross"> <svg> <g id="layer1" transform="translate(-291.18256,-337.29837)"> <path stroke-linejoin="miter" d="m331.14063,340.36763,0,29.99702" stroke="#7B7B7B" stroke-linecap="butt" stroke-miterlimit="4" stroke-dasharray="none" stroke-width="2"/> <path stroke-linejoin="miter" d="m316.11461,355.29379,30.24144,0" stroke="#7B7B7B" stroke-linecap="butt" stroke-miterlimit="4" stroke-dasharray="none" stroke-width="2"/> </g> </svg> </div>')(this.scope);
        this.container.append(template);
        $(template).css({
          position: 'absolute',
          top: -23,
          left: -45
        });
        this.wrapper.append($compile('<div class="zoom-info" data-help="zoom">x{{zoom}}</div>')(this.scope));
        drag = {
          x: 0,
          y: 0,
          state: false
        };
        delta = {
          x: 0,
          y: 0
        };
        this.wrapper.on('mousedown', (function(_this) {
          return function(e) {
            if (!_this.scope.settings.engine.container.movable) {
              return;
            }
            if ($(e.target).hasClass('ui-resizable-handle') || $(e.target).hasClass('entry') || $(e.target).hasClass('viewport') || $(e.target).hasClass('minimap')) {
              return;
            }
            if (!drag.state && e.which === LEFT_MB) {
              drag.x = e.pageX;
              drag.y = e.pageY;
              return drag.state = true;
            }
          };
        })(this));
        this.wrapper.on('mousemove', (function(_this) {
          return function(e) {
            var cur_offset;
            if (drag.state) {
              delta.x = e.pageX - drag.x;
              delta.y = e.pageY - drag.y;
              cur_offset = _this.container.offset();
              _this.container.offset({
                left: cur_offset.left + delta.x,
                top: cur_offset.top + delta.y
              });
              drag.x = e.pageX;
              return drag.y = e.pageY;
            }
          };
        })(this));
        this.wrapper.on('mouseup', (function(_this) {
          return function(e) {
            if (!_this.scope.settings.engine.container.movable) {
              return;
            }
            if (drag.state) {
              return drag.state = false;
            }
          };
        })(this));
        this.wrapper.on('contextmenu', function(e) {
          return false;
        });
        this.wrapper.on('mouseleave', function(e) {
          if (drag.state) {
            return drag.state = false;
          }
        });
        return this.wrapper.on('mousewheel', (function(_this) {
          return function(e) {
            if (!_this.scope.settings.engine.container.zoom) {
              return;
            }
            e.preventDefault();
            _this.scope.zoom += 0.1 * e.deltaY;
            _this.scope.zoom = parseFloat(_this.scope.zoom.toFixed(1));
            if (_this.scope.zoom < 0.1) {
              _this.scope.zoom = 0.1;
            } else if (_this.scope.zoom > 2) {
              _this.scope.zoom = 2;
            }
            _this.scope.instance.setZoom(_this.scope.zoom);
            _this.scope.instance.repaintEverything(_this.scope.zoom);
            $timeout(function() {
              return _this.scope.$apply(_this.scope.zoom);
            }, 0);
            return _this.container.css({
              '-webkit-transform': _this.scope.zoom,
              '-moz-transform': 'scale(' + _this.scope.zoom + ')',
              '-ms-transform': 'scale(' + _this.scope.zoom + ')',
              '-o-transform': 'scale(' + _this.scope.zoom + ')',
              'transform': 'scale(' + _this.scope.zoom + ')'
            });
          };
        })(this));
      };

      bpmnPanning.prototype.destroy = function() {
        this.wrapper.off('mousedown');
        this.wrapper.off('mousemove');
        this.wrapper.off('mouseup');
        this.wrapper.off('contextmenu');
        this.wrapper.off('mousewheel');
        this.container = null;
        this.scope = null;
        return this.wrapper = null;
      };

      return bpmnPanning;

    })();
    return bpmnPanning;
  }
]);

'use strict';
var LEFT_MB, MIDDLE_MB, RIGHT_MB,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

LEFT_MB = 1;

MIDDLE_MB = 2;

RIGHT_MB = 3;

angular.module('angular-bpmn').factory('bpmnScheme', [
  '$rootScope', 'log', 'bpmnUuid', '$compile', 'bpmnSettings', '$templateCache', '$templateRequest', '$q', '$timeout', 'bpmnObjectFact', 'bpmnPanning', function($rootScope, log, bpmnUuid, $compile, bpmnSettings, $templateCache, $templateRequest, $q, $timeout, bpmnObjectFact, bpmnPanning) {
    var bpmnScheme;
    bpmnScheme = (function() {
      bpmnScheme.prototype.isDebug = true;

      bpmnScheme.prototype.isStarted = false;

      bpmnScheme.prototype.id = null;

      bpmnScheme.prototype.scope = null;

      bpmnScheme.prototype.container = null;

      bpmnScheme.prototype.wrapper = null;

      bpmnScheme.prototype.cache = null;

      bpmnScheme.prototype.style_id = 'bpmn-style-theme';

      bpmnScheme.prototype.wrap_class = 'bpmn-wrapper';

      bpmnScheme.prototype.schemeWatch = null;

      bpmnScheme.prototype.stopListen = null;

      bpmnScheme.prototype.panning = null;

      function bpmnScheme(container, settings) {
        this.changeTheme = bind(this.changeTheme, this);
        var wrapper;
        this.id = bpmnUuid.gen();
        this.container = container;
        wrapper = container.parent('.' + this.wrap_class);
        if (wrapper.length === 0) {
          container.wrap('<div class="' + this.wrap_class + '"></div>');
        }
        this.wrapper = container.parent('.' + this.wrap_class);
        preventSelection(document);
        this.scope = $rootScope.$new();
        this.scope.extScheme = {};
        this.scope.intScheme = {
          objects: {},
          connectors: []
        };
        this.scope.settings = {};
        this.scope.selected = [];
        this.scope.zoom = 1;
        this.setSettings(settings);
        this.scope.changeTheme = this.changeTheme;
        this.wrapper.append('<div class="page-loader"><div class="spinner">loading...</div></div>');
        this.wrapper.append($compile('<div ng-if="settings.engine.container.theme_selector" class="theme-selector entry"> <select class="form-control" ng-model="settings.engine.theme" ng-change="changeTheme()" style="width: auto;" data-help="select theme"> <option ng-repeat="them in settings.theme.list" value="{{them}}">{{them}}</option></select> </div>')(this.scope));
      }

      bpmnScheme.prototype.setStatus = function() {
        if (this.scope.settings.engine.status === 'editor') {
          this.initEditor();
          return this.container.addClass('editor');
        } else {
          return this.container.addClass('viewer');
        }
      };

      bpmnScheme.prototype.setScheme = function(scheme) {
        if (scheme == null) {
          scheme = this.scope.extScheme || {};
        }
        return this.scope.extScheme = scheme;
      };

      bpmnScheme.prototype.setSettings = function(settings) {
        if (settings == null) {
          settings = {};
        }
        this.scope.settings = $.extend(true, angular.copy(bpmnSettings), angular.copy(settings));
        this.loadStyle();
        this.cacheTemplates();
        return this.objectsUpdate();
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
        log.debug('load style file:', file);
        this.wrapper.removeClass();
        return this.wrapper.addClass(this.wrap_class + ' ' + theme_name);
      };

      bpmnScheme.prototype.cacheTemplates = function() {
        if (!this.cache) {
          this.cache = [];
        }
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
                log.debug('load template file:', templateUrl);
                return $templateCache.put(templateUrl, result);
              });
            }
          };
        })(this));
      };

      bpmnScheme.prototype.makePackageObjects = function(resolve) {
        var promise;
        promise = [];
        angular.forEach(this.scope.extScheme.objects, (function(_this) {
          return function(object) {
            var obj;
            obj = new bpmnObjectFact(object, _this.scope);
            _this.scope.intScheme.objects[object.id] = obj;
            return promise.push(obj.elementPromise);
          };
        })(this));
        return $q.all(promise).then((function(_this) {
          return function() {
            angular.forEach(_this.scope.intScheme.objects, function(object) {
              object.appendTo(_this.container, _this.scope.settings.point);
              _this.scope.instance.off(object.element);
              return _this.scope.instance.on(object.element, 'click', function() {
                _this.scope.selected = [];
                _this.scope.$apply(_this.scope.selected.push(object.data.id));
                _this.deselectAll();
                return object.select(true);
              });
            });
            _this.instanceBatch();
            _this.connectPackageObjects();
            _this.isStarted = true;
            _this.wrapper.find(".page-loader").fadeOut("slow");
            return resolve();
          };
        })(this));
      };

      bpmnScheme.prototype.instanceBatch = function() {
        return this.scope.instance.batch((function(_this) {
          return function() {
            return log.debug('instance batch');
          };
        })(this));
      };

      bpmnScheme.prototype.connectPackageObjects = function() {
        var ref;
        if (((ref = this.scope.extScheme) != null ? ref.connectors : void 0) == null) {
          return;
        }
        log.debug('connect package objects');
        return angular.forEach(this.scope.extScheme.connectors, (function(_this) {
          return function(connector) {
            var points, source_obj_points, target_obj_points;
            if ((!connector.start || !connector.end) || (!_this.scope.intScheme.objects[connector.start.object] || !_this.scope.intScheme.objects[connector.end.object]) || (!_this.scope.intScheme.objects[connector.start.object].points || !_this.scope.intScheme.objects[connector.end.object].points)) {
              return;
            }
            source_obj_points = {};
            target_obj_points = {};
            angular.forEach(_this.scope.intScheme.objects, function(object) {
              if (object.data.id === connector.start.object) {
                source_obj_points = object.points;
              }
              if (object.data.id === connector.end.object) {
                return target_obj_points = object.points;
              }
            });
            if (source_obj_points[connector.start.point] == null) {
              log.error('connect: source not found', _this);
              return;
            }
            if (target_obj_points[connector.end.point] == null) {
              log.error('connect: target not found', _this);
              return;
            }
            points = {
              sourceEndpoint: source_obj_points[connector.start.point],
              targetEndpoint: target_obj_points[connector.end.point]
            };
            if (connector.title && connector.title !== "") {
              points['overlays'] = [
                [
                  "Label", {
                    label: connector.title,
                    cssClass: "aLabel"
                  }, {
                    id: "myLabel"
                  }
                ]
              ];
            }
            return _this.scope.intScheme.connectors.push(_this.scope.instance.connect(points, _this.scope.settings.connector));
          };
        })(this));
      };

      bpmnScheme.prototype.addObjects = function(objects) {
        var newObjects, promise;
        if (!objects || objects === '') {
          return;
        }
        promise = [];
        newObjects = {};
        angular.forEach(objects, (function(_this) {
          return function(object) {
            var obj;
            obj = new bpmnObjectFact(object, _this.scope);
            if (!_this.scope.intScheme.objects[object.id]) {
              _this.scope.intScheme.objects[object.id] = obj;
              newObjects[object.id] = obj;
            }
            return promise.push(obj.elementPromise);
          };
        })(this));
        return $q.all(promise).then((function(_this) {
          return function() {
            return angular.forEach(newObjects, function(object) {
              return object.appendTo(_this.container, _this.scope.settings.point);
            });
          };
        })(this));
      };

      bpmnScheme.prototype.removeObject = function(object) {};

      bpmnScheme.prototype.deselectAll = function() {
        return angular.forEach(this.scope.intScheme.objects, function(object) {
          return object.select(false);
        });
      };

      bpmnScheme.prototype.objectsUpdate = function() {
        return angular.forEach(this.scope.intScheme.objects, function(object) {
          return object.templateUpdate();
        });
      };

      bpmnScheme.prototype.start = function() {
        log.debug('start');
        return $q((function(_this) {
          return function(resolve) {
            return _this.instart(resolve);
          };
        })(this));
      };

      bpmnScheme.prototype.instart = function(resolve) {
        var ref;
        if (!this.panning) {
          this.panning = new bpmnPanning(this.container, this.scope, this.wrapper);
        }
        this.loadStyle();
        if (!this.scope.instance) {
          this.scope.instance = jsPlumb.getInstance($.extend(true, this.scope.settings.instance, {
            Container: this.container
          }));
        }
        this.cache = [];
        this.cacheTemplates();
        this.container.addClass('bpmn');
        this.setStatus();
        if (this.schemeWatch) {
          this.schemeWatch();
        }
        this.schemeWatch = this.scope.$watch('extScheme', (function(_this) {
          return function(val, old_val) {
            if (val === old_val) {
              return;
            }
            return _this.restart();
          };
        })(this));
        $q.all(this.cache).then((function(_this) {
          return function() {
            return _this.makePackageObjects(resolve);
          };
        })(this));
        if (((ref = this.scope.settings.engine.container) != null ? ref.resizable : void 0) != null) {
          if (this.wrapper.resizable('instance')) {
            this.wrapper.resizable('destroy');
          }
          this.wrapper.resizable({
            minHeight: 200,
            minWidth: 400,
            grid: 10,
            handles: 's'
          });
        }
        return this.stopListen = this.scope.$on('$routeChangeSuccess', (function(_this) {
          return function() {
            return _this.destroy();
          };
        })(this));
      };

      bpmnScheme.prototype.destroy = function() {
        log.debug('destroy');
        this.wrapper.find(".page-loader").fadeIn("fast");
        angular.forEach(this.scope.intScheme.objects, function(obj) {
          return obj.remove();
        });
        this.scope.intScheme.objects = [];
        this.scope.instance.empty(this.container);
        if (this.schemeWatch) {
          this.schemeWatch();
        }
        if (this.panning) {
          this.panning.destroy();
        }
        return this.panning = null;
      };

      bpmnScheme.prototype.restart = function() {
        log.debug('restart');
        if (this.isStarted != null) {
          this.destroy();
        }
        return this.start();
      };

      bpmnScheme.prototype.changeTheme = function() {
        this.loadStyle();
        this.cacheTemplates();
        return this.objectsUpdate();
      };

      bpmnScheme.prototype.initEditor = function() {
        return this.droppableInit();
      };

      bpmnScheme.prototype.droppableInit = function() {
        return this.wrapper.droppable({
          drop: (function(_this) {
            return function(event, ui) {
              var data_group, id, objects, offset, position, type;
              offset = _this.wrapper.offset();
              position = {
                left: ui.position.left - offset.left - _this.container.position().left,
                top: ui.position.top - offset.top - _this.container.position().top
              };
              type = $(ui.draggable).attr('entry-type');
              data_group = $(ui.draggable).parent().attr('data-group');
              if (!type || type === '') {
                return;
              }
              id = bpmnUuid.gen();
              objects = [];
              if (data_group === 'swimlane') {
                objects.push($.extend(true, angular.copy(_this.scope.settings.baseObject), {
                  id: id,
                  type: {
                    name: 'swimlane'
                  },
                  draggable: false,
                  position: position
                }));
                objects.push($.extend(true, angular.copy(_this.scope.settings.baseObject), {
                  id: bpmnUuid.gen(),
                  parent: id,
                  type: {
                    name: 'swimlane-row'
                  },
                  draggable: false
                }));
              } else {
                objects.push($.extend(true, angular.copy(_this.scope.settings.baseObject), {
                  id: id,
                  type: JSON.parse(type),
                  draggable: true,
                  position: position
                }));
              }
              return _this.addObjects(objects);
            };
          })(this)
        });
      };

      return bpmnScheme;

    })();
    return bpmnScheme;
  }
]);

'use strict';
angular.module('angular-bpmn').factory('bpmnSettings', function() {
  var baseObject, connector, connectorSettings, connectorStyle, draggableSettings, engineSettings, instanceSettings, pointSettings, sourceSettings, targetSettings, template, templates, themeSettings;
  themeSettings = {
    root_path: '/themes',
    list: ['orange', 'minimal']
  };
  engineSettings = {
    theme: 'minimal',
    status: 'viewer',
    container: {
      resizable: true,
      zoom: true,
      movable: true,
      minimap: false,
      theme_selector: true
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
    endpoint: [
      "Dot", {
        radius: 1
      }
    ],
    maxConnections: -1,
    paintStyle: {
      outlineWidth: 1
    },
    hoverPaintStyle: {},
    connectorStyle: connectorStyle
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
      template: '<div bpmn-object class="group solid etc draggable" ng-style="{width: data.width, height: data.height}" ng-class="{ dashed : data.style == \'dashed\', solid : data.style == \'solid\' }"> <div class="title">{{data.title}}</div> </div>',
      anchor: [],
      make: [],
      draggable: true,
      size: {
        width: 'auto',
        height: 'auto'
      },
      helper: '<div class="bpmn-icon-subprocess-expanded" style="font-size: 33px"></div>'
    },
    swimlane: {
      template: '<div bpmn-object class="swimlane etc draggable" ng-style="{ width: data.width }"></div>',
      anchor: [],
      make: [],
      draggable: true,
      size: {
        width: 'auto',
        height: 'auto'
      },
      helper: '<div class="bpmn-icon-participant" style="font-size: 33px"></div>'
    },
    'swimlane-row': {
      template: '<div bpmn-object class="swimlane-row" ng-style="{width: \'100%\', height: data.height }"> <div class="header"><div class="text">{{data.title}}</div></div> </div>',
      anchor: [],
      make: [],
      draggable: false,
      size: {
        width: 'auto',
        height: 'auto'
      }
    },
    poster: {
      template: '<div bpmn-object class="poster draggable" ng-class="{ \'etc\' : data.draggable }"><img ng-src="{{data.url}}"></div>',
      anchor: [],
      make: [],
      draggable: true,
      size: {
        width: 'auto',
        height: 'auto'
      }
    },
    "default": {
      template: '<div bpmn-object class="dummy etc draggable">shape not found</div>',
      anchor: [[0.5, 0, 0, -1, 0, 2], [1, 0.5, 1, 0, -2, 0], [0.5, 1, 0, 1, 0, -2], [0, 0.5, -1, 0, 2, 0]],
      make: ['source', 'target'],
      draggable: true,
      size: {
        width: 50,
        height: 50
      }
    }
  };
  baseObject = {
    id: 0,
    type: {
      name: ''
    },
    position: {
      top: 0,
      left: 0
    },
    status: '',
    error: '',
    title: '',
    description: ''
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
    templates: templates,
    baseObject: baseObject
  };
});

'use strict';
(function() {
  'use strict';
  window.lsTooltip = {
    timeout: 0,
    init: function() {
      $(document).on('mouseover', '[data-help]', function() {
        var el;
        el = this;
        lsTooltip.timeout = setTimeout((function() {
          lsTooltip.open(el);
        }), 400);
      });
      $(document).on('mouseout', '[data-help]', function() {
        clearTimeout(lsTooltip.timeout);
        lsTooltip.close();
      });
    },
    destroy: function() {
      $(document).off('mouseover', '[data-help]');
      $(document).off('mouseout', '[data-help]');
    },
    open: function(el) {
      var e_l, e_t, e_w, t_h, t_w, tooltip, v_w;
      $('body').prepend($('<div>', {
        'class': 'ls-tooltip'
      }).append($('<div>', {
        'class': 'inner'
      })).append($('<span>')));
      tooltip = $('.ls-tooltip');
      tooltip.find('.inner').html($(el).data('help'));
      v_w = $(window).width();
      e_w = $(el).width();
      e_l = $(el).offset().left;
      e_t = $(el).offset().top;
      t_w = tooltip.outerWidth();
      t_h = tooltip.outerHeight();
      tooltip.css({
        top: e_t - t_h - 10,
        left: e_l - ((t_w - e_w) / 2)
      });
      if (tooltip.offset().left + t_w > v_w) {
        tooltip.css({
          'left': 'auto',
          'right': 10
        });
        tooltip.find('span').css({
          left: 'auto',
          right: v_w - ($(el).offset().left) - ($(el).outerWidth() / 2) - 17,
          marginLeft: 'auto'
        });
      }
    },
    close: function() {
      $('.ls-tooltip').remove();
    }
  };
  $(document).ready(function() {
    window.lsTooltip.init();
  });
})();

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
