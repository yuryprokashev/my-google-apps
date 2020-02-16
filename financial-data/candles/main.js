Logger = console;
function onTimeTrigger(){
    var candleModule = new CandlesConstructor();
    candleModule.CandleSynchronizer.execute();
}