var _ = require('lodash');
var decorate = require('./event-decorator');

var options = {
    debug: false
};

module.exports = function ($rootScopeProvider) {
    var $get = $rootScopeProvider.$get.slice(-1)[0];

    this.options = _.assign(options, module.exports.options);

    this.$get = $rootScopeProvider.$get.slice(0, -1).concat([function () {
            var $rootEventScope = $get.apply($rootScopeProvider, arguments);

            decorate($rootEventScope.constructor.prototype, options);

            return $rootEventScope;
        }
    ]);
}

module.exports.options = options;
