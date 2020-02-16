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
        _objectAppByTypeMap.set("FinnhubTrade", new Trades.TradesConstructor().FinnhubTradeApp);
        _objectAppByTypeMap.set("Candle", new Candles.CandlesConstructor().CandleApp);
        _objectAppByTypeMap.set("Error", new Errors.ErrorsConstructor().ErrorApp);
    }
}