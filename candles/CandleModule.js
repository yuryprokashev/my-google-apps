/**
 *
 * @constructor
 */
function CandleModuleConstructor() {
    var baseModule = new BaseModule.BaseModuleConstructor();
    var httpModule = new HttpModule.HttpModuleConstructor();
    this.CandleBuilderFactory = new CandleBuilderFactoryConstructor(baseModule, this);
    this.CandleApp = new CandleAppConstructor(baseModule, this);
    this.CandleRowFactory = new CandleRowFactoryConstructor(baseModule, this);
    this.CandleSynchronizer = new CandleSynchronizerConstructor(baseModule, httpModule, this);
}