# angular language code
angular module for support ISO 639

1. import to HTML page
```
<script src="ngLangcode.min.js"></script>
```
2. add to denpendecies
```
var app = angular.module('myApp', [ngLangcode])
```
## factory
```
//ngLangcodeFactory
app.controller('myController', ['ngLangcodeFactory',function(ngLangcodeFactory){
    //langNames
    ngLangcodeFactory.getLangNames();
}])
```

## filter
```
//lang2code
```