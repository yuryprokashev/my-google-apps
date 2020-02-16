/**
 *
 * @constructor
 */
function ErrorBuilderFactoryConstructor() {
    this.getBuilder = function () {
        return new ErrorBuilder();
    };

    /**
     *
     * @constructor
     */
    function ErrorBuilder(){
        var _timestamp, _event, _message, _stack, _sender;
        this.setTimestamp = function(number){
            _timestamp = number;
            return this;
        };
        this.setContextEvent = function(obj){
            _event = obj;
            return this;
        };
        this.setErrorMessage = function (str) {
            _message = str;
            return this;
        };
        this.setStackTrace = function (str) {
            _stack = str;
            return this;
        };
        this.setSenderName = function (str) {
            _sender = str;
            return this;
        };
        this.build = function () {
            return new ErrorModel(_timestamp, _event, _message, _stack, _sender);
        };
    }

    /**
     *
     * @param timestamp
     * @param event
     * @param message
     * @param stack
     * @param sender
     * @constructor
     */
    function ErrorModel(timestamp, event, message, stack, sender){
        this.timestamp = timestamp;
        this.event = event;
        this.message = message;
        this.stack = stack;
        this.sender = sender;
    }
}