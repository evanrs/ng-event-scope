var decorate = require('./event-decorator');

module.exports = function ($rootScopeProvider) {
    var $get = $rootScopeProvider.$get.slice(-1)[0];

    $rootScopeProvider.$get =
    this.$get = $rootScopeProvider.$get.slice(0, -1).concat([
        function() {
            var $rootScope = $get.apply($rootScopeProvider, arguments);

            decorate($rootScope.constructor.prototype);

            return $rootScope
        }
    ]);
}