/**
 *
 * @constructor
 */
function TradeModuleConstructor() {
    var baseModule = new BaseModule.BaseModuleConstructor();
    var tradeToRowMap = baseModule.KeyMapBuilderFactory.getBuilder().build();
    tradeToRowMap.set("t", 0);
    tradeToRowMap.set("s", 1);
    tradeToRowMap.set("p", 2);
    tradeToRowMap.set("v", 3);
    this.FinnhubTradeToRowFactory = baseModule.ObjectToRowFactoryBuilderFactory.getBuilder()
        .setObjectToRowMap(tradeToRowMap)
        .build();
    this.FinnhubTradeApp = new FinnhubTradeAppConstructor(baseModule, this);
}