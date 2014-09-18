var $eventScopeProvider = require('./src/$eventScopeProvider');
var $rootScopeDecorator = require('./src/$rootScopeDecorator');

module.exports = function(ngModule) {
    return ngModule.provider(
        '$eventScope', ['$rootScopeProvider', $eventScopeProvider]);
}

module.exports.$rootScopeDecorator = function(ngModule) {
    return ngModule.provider(
        '$rootScopeDecorator', ['$rootScopeProvider', $rootScopeDecorator]);
}
