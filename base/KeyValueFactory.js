/**
 *
 * @constructor
 */
function KeyValueFactory() {
    this.create = function (key, value) {
        return new KeyValue(key, value);
    };

    /**
     *
     * @param key {string}
     * @param value {Object}
     * @constructor
     */
    function KeyValue(key, value) {
        this.getKey = function () {
            return key;
        };
        this.getValue = function () {
            return value;
        };
    }
}