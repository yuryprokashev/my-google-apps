/**
 *
 * @constructor
 */
function CandleBuilderFactoryConstructor(){
    this.getBuilder = function () {
        return new CandleBuilder();
    };

    /**
     *
     * @constructor
     */
    function CandleBuilder() {
        var _timestamp, _resolutionSeconds, _symbol, _openPrice, _closePrice, _highestPrice, _lowestPrice, _volume;
        this.setTimestamp = function (numberOfMilliseconds) {
            _timestamp = numberOfMilliseconds;
            return this;
        };
        this.setSymbol = function (str) {
            _symbol = str;
            return this;
        };
        this.setOpenPrice = function (value){
            _openPrice = parseFloat(value);
            return this;
        };
        this.setClosePrice = function (value) {
            _closePrice = parseFloat(value);
            return this;
        };
        this.setHighestPrice = function (value) {
            _highestPrice = parseFloat(value);
            return this;
        };
        this.setLowestPrice = function (value) {
            _lowestPrice = parseFloat(value);
            return this;
        };
        this.setResolution = function (numberOfSeconds) {
            _resolutionSeconds = numberOfSeconds;
            return this;
        };
        this.setVolume = function (value) {
            _volume = parseFloat(value);
            return this;
        };
        this.build = function () {
            return new Candle(_timestamp, _resolutionSeconds, _symbol, _openPrice, _closePrice, _highestPrice, _lowestPrice, _volume);
        };
    }

    /**
     *
     * @constructor
     */
    function Candle(timestamp, resolutionSeconds, symbol, open, close, highest, lowest, volume) {
        var _date = new Date(timestamp);
        this.getTimestamp = function () {
            return timestamp;
        };
        this.getResolution = function () {
            return resolutionSeconds;
        };
        this.getSymbol = function () {
            return symbol;
        };
        this.getOpenPrice = function () {
            return open;
        };
        this.getClosePrice = function () {
            return close;
        };
        this.getHighestPrice = function () {
            return highest;
        };
        this.getLowestPrice = function () {
            return lowest;
        };
        this.getVolume = function () {
            return volume;
        };
        this.getDate = function () {
            return _date;
        };
    }
}