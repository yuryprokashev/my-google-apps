/**
 *
 * @constructor
 */
function TradesConstructor() {
    var baseModule = new BaseModule.BaseModuleConstructor();
    const tradesSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1bOF0xfyD6ssvCAY1_R3n76TLqNupOxkm6g9H4SFb0Tk/edit";
    this.FinnhubTradeApp = baseModule.ObjectAppBuilderFactory.getBuilder()
        .setSpreadsheetUrl(tradesSpreadsheetUrl)
        .setSheetName("Trades")
        .addObjectToRowMapping("t", 0)
        .addObjectToRowMapping("s", 1)
        .addObjectToRowMapping("p", 2)
        .addObjectToRowMapping("v", 3)
        .build();
}