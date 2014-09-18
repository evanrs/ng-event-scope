var $eventScopeProvider = require('./src/$eventScopeProvider');

module.exports = function(ngModule) {
    return ngModule.provider(
        '$eventScope', ['$rootScopeProvider', $eventScopeProvider]);
}
