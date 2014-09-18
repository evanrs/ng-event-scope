ng-event-scope
==============

Backbone style events in Angular.

This extends the $rootScopeProvider to create a $scope isolate with the $emit and $broadcast methods decorated to split events on `:` colons.

Variations on implementation can be found in the [$event-scope gist](https://gist.github.com/evanrs/0e2fc6599e4df56364d6).


A usage sample that should really be a test
---
```javascript

ngModule.run(function($rootScope) {
    var $scope = $rootScope.$new();
 
    $scope.$on("a:b:c", function(){
        console.log(arguments[1], "\t==\t", "$scope.$on(a:b:c)");
    });
 
    $scope.$on("a:b*", function(){
        console.log(arguments[1], "\t==\t", "$scope.$on(a:b*)");
    });
 
    $scope.$on("a*", function(){
        console.log(arguments[1], "\t==\t", "$scope.$on(a*)");
    });
 
    $rootScope.$on("a:b:c", function() {
        console.log(arguments[1], "\t==\t", "$rootScope.$on(a:b:c)");
    });
 
    $rootScope.$on("a:b*", function() {
        console.log(arguments[1], "\t==\t", "$rootScope.$on(a:b*)");
    });
 
    $rootScope.$on("a*", function() {
        console.log(arguments[1], "\t==\t", "$rootScope.$on(a*)");
    });
 
    $scope.$emit("a:b:c", "$scope.$emit(a:b:c)");
    $scope.$broadcast("a:b:c", "$scope.$broadcast(a:b:c)");
 
    $rootScope.$emit("a:b:c", "$rootScope.$emit(a:b:c)");
    $rootScope.$broadcast("a:b:c", "$rootScope.$broadcast(a:b:c)");
});

```
