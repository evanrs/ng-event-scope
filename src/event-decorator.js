module.exports = function(proto, options) {
    options= options || {};

    var $broadcast = proto.$broadcast;
    var $emit = proto.$emit;

    proto.$emit = function() {
        options.debug && console.log('emit\n',  arguments);

        var event = $emit.apply(this, arguments);
        var nextEvent = getNextEvent(arguments);
        event.cascade = event.stopCascade || !nextEvent ?
            false : this.$emit.apply(this, nextEvent);

        return event;
    }

    proto.$broadcast = function() {
        options.debug && console.log('broadcast\n', arguments);

        var event = $broadcast.apply(this, arguments);
        var nextEvent = getNextEvent(arguments);

        event.cascade = event.stopCascade || !nextEvent ?
            false : this.$broadcast.apply(this, nextEvent);

        return event;
    }

    return proto;
}

function getNextEvent (args) {
    args = _.toArray(args);

    var events = args[0].split(':');
    var previous = events.slice(-1).join('');
    var next = events.slice(0,-1).join(':');

    if(/[*]/g.test(previous)) {
        previous = [previous.replace('*', ''), args[1] || ''].join(':');
        args = args.slice(2);
    } else {
        args = args.slice(1);
    }

    return next ? [next + '*', previous].concat(args) : false;
}