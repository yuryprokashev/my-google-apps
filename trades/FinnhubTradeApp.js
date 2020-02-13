/**
 *
 * @param BaseModule
 * @param FinnhubTradesModule
 * @constructor
 */
function FinnhubTradeAppConstructor(BaseModule, FinnhubTradesModule){
    var _tradesTable;
    var tradesSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1bOF0xfyD6ssvCAY1_R3n76TLqNupOxkm6g9H4SFb0Tk/edit";
    var tradesTabName = "FinnhubTrades";
    this.save = function(finnhubTrades){
        if(!_tradesTable) _init();
        var finnhubTradeRows = FinnhubTradesModule.FinnhubTradeToRowFactory.createMany(finnhubTrades);
        _tradesTable.save(finnhubTradeRows);
    };
    function _init(){
        _tradesTable = BaseModule.TableBuilderFactory.getBuilder()
            .setSpreadsheetUrl(tradesSpreadsheetUrl)
            .setSheetName(tradesTabName)
            .setNumberOfColumns(4)
            .build();
    }
}