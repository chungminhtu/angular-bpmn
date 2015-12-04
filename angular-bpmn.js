'use strict';
angular.module('angular-bpmn', []);

'use strict';
angular.module('appServices').service('bpmnMock', function() {
  return {
    schema1: {
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
