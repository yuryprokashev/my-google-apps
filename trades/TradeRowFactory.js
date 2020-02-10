/**
 *
 * @constructor
 */
function TradeRowFactoryConstructor() {
    var _finnhubTradeToRowMap = BaseModule.KeyMapBuilderFactory.getBuilder().build();
    _finnhubTradeToRowMap.set("t", 0);
    _finnhubTradeToRowMap.set("s", 1);
    _finnhubTradeToRowMap.set("p", 2);
    _finnhubTradeToRowMap.set("v", 3);
    this.createMany = function (finnhubTrades) {
        return _createMany(finnhubTrades);
    };
    this.createOne = function (finnhubTrade) {
        return _createOne(finnhubTrade);
    };
    function _createMany(finnhubTrades) {
        var rows = [];
        finnhubTrades.forEach(function (trade) {
            rows.push(_createOne(trade));
        });
        return rows;
    }
    function _createOne(finnhubTrade) {
        var row = [];
        Object.keys(finnhubTrade).forEach(function(getter){
            if(_finnhubTradeToRowMap.has(getter)) {
                var finnhubTradeRowIndex = _finnhubTradeToRowMap.get(getter);
                row[finnhubTradeRowIndex] = finnhubTrade[getter];
            }
        });
        return row;
    }
}