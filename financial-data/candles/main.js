Logger = console;
function onTimeTrigger(){
    var candleModule = new CandleModuleConstructor();
    candleModule.CandleSynchronizer.execute();
}