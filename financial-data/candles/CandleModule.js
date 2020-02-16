/**
 *
 * @constructor
 */
function CandleModuleConstructor() {
    var baseModule = new BaseModule.BaseModuleConstructor();
    var httpModule = new HttpModule.HttpModuleConstructor();
    const candlesSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1oQO_oN_C2KvrwqnzGvvRxAWoYx41I1fGR-0KttO1iLw/edit";
    this.CandleBuilderFactory = new CandleBuilderFactoryConstructor(baseModule, this);
    this.CandleApp = baseModule.ObjectAppBuilderFactory.getBuilder()
        .setSpreadsheetUrl(candlesSpreadsheetUrl)
        .setSheetName("Candles")
        .addOnjectToRowMapping("getTimestamp", 0)
        .addOnjectToRowMapping("getSymbol", 1)
        .addOnjectToRowMapping("getOpenPrice", 2)
        .addOnjectToRowMapping("getHighestPrice", 3)
        .addOnjectToRowMapping("getLowestPrice", 4)
        .addOnjectToRowMapping("getClosePrice", 5)
        .addOnjectToRowMapping("getVolume", 6)
        .build();
    this.CandleSynchronizer = new CandleSynchronizerConstructor(baseModule, httpModule, this);
}