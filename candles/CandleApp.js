/**
 *
 * @constructor
 */
function CandleAppConstructor(BaseModule, CandleModule) {
    var candleSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1oQO_oN_C2KvrwqnzGvvRxAWoYx41I1fGR-0KttO1iLw/edit";
    var candleSheetName = "Candles";
    var _candleTable = BaseModule.TableBuilderFactory.getBuilder()
        .setSpreadsheetUrl(candleSpreadsheetUrl)
        .setSheetName(candleSheetName)
        .setNumberOfColumns(7)
        .build();
    this.save = function(candles){
        var candleRows = CandleModule.CandleRowFactory.createMany(candles);
        Logger.log(candleRows[0]);
        _candleTable.save(candleRows);
    };
}