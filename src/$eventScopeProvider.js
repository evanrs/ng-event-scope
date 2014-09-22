var decorate = require('./event-decorator');

module.exports = function ($rootScopeProvider) {
    var $get = $rootScopeProvider.$get.slice(-1)[0];

    this.$get = $rootScopeProvider.$get.slice(0, -1).concat([
        function () {
            var $rootEventScope = $get.apply($rootScopeProvider, arguments);

            decorate($rootEventScope.constructor.prototype);

            return $rootEventScope;
        }
    ]);
}