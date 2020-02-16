/**
 *
 * @constructor
 */
function ObjectAppRepositoryConstructor(){
    var _objectAppByTypeMap;
    this.getById = function(objectType){
        if(!_objectAppByTypeMap) _init();
        return _objectAppByTypeMap.get(objectType);
    };
    function _init(){
        var baseModule = new BaseModule.BaseModuleConstructor();
        _objectAppByTypeMap = baseModule.KeyMapBuilderFactory.getBuilder().build();
        var tradeApp = new Trades.TradesConstructor().FinnhubTradeApp;
        var candleApp = new Candles.CandlesConstructor().CandleApp;
        var errorApp = new Errors.ErrorsConstructor().ErrorApp;
        baseModule.Validator.isDefined("TradeApp", tradeApp);
        baseModule.Validator.isDefined("CandleApp", candleApp);
        baseModule.Validator.isDefined("ErrorApp", errorApp);
        _objectAppByTypeMap.set("FinnhubTrade", tradeApp);
        _objectAppByTypeMap.set("Candle", candleApp);
        _objectAppByTypeMap.set("Error", errorApp);
    }
}