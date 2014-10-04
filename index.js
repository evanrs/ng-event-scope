var $eventScopeProvider = require('./src/$eventScopeProvider');
var $rootScopeDecorator = require('./src/$rootScopeDecorator');

module.exports = function(ngModule, options) {
    $eventScopeProvider.options = options;
    return ngModule.provider(
        '$eventScope', ['$rootScopeProvider', $eventScopeProvider]);
}

module.exports.$rootScopeDecorator = function(ngModule, options) {
    $rootScopeDecorator.options = options;
    return ngModule.provider(
        '$rootScopeDecorator', ['$rootScopeProvider', $rootScopeDecorator]);
}
