/**
 *
 * @constructor
 */
function CandleRowFactoryConstructor(BaseModule){
    var _candleToCandleRowMap = BaseModule.KeyMapBuilderFactory.getBuilder().build();
    _candleToCandleRowMap.set("getTimestamp", 0);
    _candleToCandleRowMap.set("getSymbol", 1);
    _candleToCandleRowMap.set("getOpenPrice", 2);
    _candleToCandleRowMap.set("getHighestPrice", 3);
    _candleToCandleRowMap.set("getLowestPrice", 4);
    _candleToCandleRowMap.set("getClosePrice", 5);
    _candleToCandleRowMap.set("getVolume", 6);
    this.createMany = function(candles){
        return _createMany(candles);
    };
    this.createOne = function (candle) {
        return _createOne(candle);
    };
    function _createMany(candles) {
        var candleRows = [];
        candles.forEach(function (candle) {
            candleRows.push(_createOne(candle));
        });
        return candleRows;
    }
    function _createOne(candle) {
        var candleRow = [];
        Object.keys(candle).forEach(function(getter){
            if(_candleToCandleRowMap.has(getter)) {
                var candleRowIndex = _candleToCandleRowMap.get(getter);
                candleRow[candleRowIndex] = candle[getter]();
            }
        });
        return candleRow;
    }
}