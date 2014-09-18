module.exports = function ($rootScopeProvider) {
    var $get = $rootScopeProvider.$get.slice(-1)[0];
    var $eventScope
    var proto;
    var $cast;
    var $emit;

    this.$get = ['$injector', '$exceptionHandler', '$parse', '$browser',
        function ($injector, $exceptionHandler, $parse, $browser) {

        $eventScope = $eventScope || $get.apply($rootScopeProvider, arguments);

        proto = proto || $eventScope.constructor.prototype;
        $cast = $cast || proto.$broadcast;
        $emit = $emit || proto.$emit;

        proto.$emit = function(name, args) {
            //(a:b:c)-> [] (a) => [a] (b) => [a, a:b] (c) => [a, a:b, a:b:c]
            var event = $emit.call(this, name, args);
            var cascade = name.split(':').slice(0,-1).join(':');
            event.cascade = cascade && !event.stopCascade ?
                    this.$emit(cascade+'*', args) : false;
            return event;
        }

        proto.$broadcast = function(name, args) {
            //(a:b:c)-> [] (a) => [a] (b) => [a, a:b] (c) => [a, a:b, a:b:c]
            var event = $cast.call(this, name, args);
            var cascade = name.split(':').slice(0,-1).join(':');
            event.cascade = cascade && !event.stopCascade ?
                    this.$broadcast(cascade+'*', args) : false;
            return event;
        }

        return $eventScope;
    }];
}
