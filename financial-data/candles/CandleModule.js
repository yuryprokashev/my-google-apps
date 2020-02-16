/**
 *
 * @constructor
 */
function CandlesConstructor() {
    var baseModule = new BaseModule.BaseModuleConstructor();
    var httpModule = new HttpModule.HttpModuleConstructor();
    const candlesSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1oQO_oN_C2KvrwqnzGvvRxAWoYx41I1fGR-0KttO1iLw/edit";
    this.CandleBuilderFactory = new CandleBuilderFactoryConstructor(baseModule, this);
    this.CandleApp = baseModule.ObjectAppBuilderFactory.getBuilder()
        .setSpreadsheetUrl(candlesSpreadsheetUrl)
        .setSheetName("Candles")
        .addObjectToRowMapping("getTimestamp", 0)
        .addObjectToRowMapping("getSymbol", 1)
        .addObjectToRowMapping("getOpenPrice", 2)
        .addObjectToRowMapping("getHighestPrice", 3)
        .addObjectToRowMapping("getLowestPrice", 4)
        .addObjectToRowMapping("getClosePrice", 5)
        .addObjectToRowMapping("getVolume", 6)
        .build();
    this.CandleSynchronizer = new CandleSynchronizerConstructor(baseModule, httpModule, this);
}