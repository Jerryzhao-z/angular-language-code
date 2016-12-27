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
    //get list of name of languages in English
    ngLangcodeFactory.langNames();
    //get list of name of languages in local language
    ngLangcodeFactory.langLocalNames();
    //get list of ISO-639 alpha 1
    ngLangcodeFactory.langAlpha1();
    //get list of ISO-639 alpha 2
    ngLangcodeFactory.langAlpha2();
    //get list of ISO-639 alpha 2T
    ngLangcodeFactory.langAlpha2T();
    //get list of ISO-639 alpha 2B
    ngLangcodeFactory.langAlpha2B();
    //get list of ISO-639 alpha 3
    ngLangcodeFactory.langAlpha3();

    //existance of a lanuage, return type is boolean
    ngLangcodeFactory.langExist("French")
}])
```

## filter
```
//lang2code
/*
 * lang2code:<input code type>:<output code type>
 */
//js
app.controller("myController", function($scope){
    $scope.language = "fra"
})

//HTML
<body>
    <span>{{language|lang2code:"alpha2":"local"}}</span>
</body>
```
code type: 
 * "name"
 * "local"
 * "alpha1"
 * "alpha2"
 * "alpha2T"
 * "alpha2B"
 * "alpha3"