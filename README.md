Angular bpmn
------------

Angular bpmn engine based on [jsPlumb](https://github.com/sporritt/jsplumb/) jquery plugin. 
Work in progress.

[examples](http://bpmn.e154.ru/)

#### init
    
command for environment initial

```bash
    ./build.sh init             
```

#### install with bower

```bash
	bower install angular-bpmn
```

```javascript
	app = angular
      .module('app', [
        'ngRoute'
        'appControllers'
        'appFilters'
        'appServices'
        'angular-bpmn'	<-- add this
        'route-segment'
        'view-segment'
      ])
```

#### LICENSE

Angular bpmn engine is licensed under the [MIT License (MIT)](https://github.com/e154/angular-bpmn/blob/master/LICENSE)
