/**
 *
 * @constructor
 */
function CandleModuleConstructor() {
    var baseModule = new BaseModule.BaseModuleConstructor();
    var httpModule = new HttpModule.HttpModuleConstructor();
    var candleToRowMap = baseModule.KeyMapBuilderFactory.getBuilder().build();
    candleToRowMap.set("getTimestamp", 0);
    candleToRowMap.set("getSymbol", 1);
    candleToRowMap.set("getOpenPrice", 2);
    candleToRowMap.set("getHighestPrice", 3);
    candleToRowMap.set("getLowestPrice", 4);
    candleToRowMap.set("getClosePrice", 5);
    candleToRowMap.set("getVolume", 6);
    this.CandleBuilderFactory = new CandleBuilderFactoryConstructor(baseModule, this);
    this.CandleApp = new CandleAppConstructor(baseModule, this);
    this.CandleRowFactory = baseModule.ObjectToRowFactoryBuilderFactory.getBuilder().setObjectToRowMap(candleToRowMap).build();
    this.CandleSynchronizer = new CandleSynchronizerConstructor(baseModule, httpModule, this);
}