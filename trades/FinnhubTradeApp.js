/**
 *
 * @param BaseModule
 * @param FinnhubTradesModule
 * @constructor
 */
function FinnhubTradeAppConstructor(BaseModule, FinnhubTradesModule){
    var _tradeToRowMap;
    var _tradesFactory;
    var _tradesTable;
    var tradesSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1bOF0xfyD6ssvCAY1_R3n76TLqNupOxkm6g9H4SFb0Tk/edit";
    var tradesTabName = "FinnhubTrades";
    this.save = function(finnhubTrades){
        if(!_tradesTable) _init();
        var finnhubTradeRows = FinnhubTradesModule.FinnhubTradeToRowFactory.createMany(finnhubTrades);
        _tradesTable.save(finnhubTradeRows);
    };
    function _init(){
        _tradeToRowMap = BaseModule.KeyMapBuilderFactory.getBuilder().build();
        _tradeToRowMap.set("t", 0);
        _tradeToRowMap.set("s", 1);
        _tradeToRowMap.set("p", 2);
        _tradeToRowMap.set("v", 3);
        _tradesTable = BaseModule.TableBuilderFactory.getBuilder()
            .setSpreadsheetUrl(tradesSpreadsheetUrl)
            .setSheetName(tradesTabName)
            .setNumberOfColumns(_tradeToRowMap.keys().length)
            .build();
        _tradesFactory = BaseModule.ObjectToRowFactoryBuilderFactory.getBuilder()
            .setObjectToRowMap(_tradeToRowMap)
            .build();
    }
}