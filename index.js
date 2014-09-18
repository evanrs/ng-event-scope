var $eventScopeProvider = require('./$eventScopeProvider');

module.exports = function(ngModule) {
    return ngModule.provider(['$rootScopeProvider', $eventScopeProvider]);
}
