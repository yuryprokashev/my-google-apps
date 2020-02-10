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
        _objectAppByTypeMap.set("FinnhubTrade", new Trades.TradeModuleConstructor().FinnhubTradeApp);
        _objectAppByTypeMap.set("Candle", new Candles.CandleModuleConstructor().CandleApp);
        _objectAppByTypeMap.set("Error", new ErrorAppConstructor(baseModule));
    }
}