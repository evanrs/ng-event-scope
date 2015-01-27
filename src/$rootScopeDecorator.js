var _ = require('lodash');
var decorate = require('./event-decorator');

var options = {
    debug: false
};

module.exports = function ($rootScopeProvider) {
    var $get = $rootScopeProvider.$get.slice(-1)[0];

    this.options = _.assign(options, module.exports.options);

    $rootScopeProvider.$get =
        this.$get = $rootScopeProvider.$get.slice(0, -1).concat([function() {
            var $rootScope = $get.apply($rootScopeProvider, arguments);

            decorate($rootScope.constructor.prototype, options);

            return $rootScope
        }
    ]);
}

module.exports.options = options;
