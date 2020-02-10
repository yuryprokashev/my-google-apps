/**
 *
 * @constructor
 */
function CandleSynchronizerConstructor(BaseModule, HttpModule, CandleModule) {
    var baseUrl = PropertiesService.getScriptProperties().getProperty("finnhub.baseUrl");
    var apiKey = PropertiesService.getScriptProperties().getProperty("finnhub.apiKey");
    var fromMs = new Date(PropertiesService.getScriptProperties().getProperty("candleSync.lastCandleDatetime")).valueOf();
    var toMs = new Date().valueOf();
    var candleResolutionMinutes = 1;
    this.execute = function () {
        var candleData = _getCandleDataFromFinnhub();
        Logger.log("Candle Data received from Finnhub: %s", candleData);
        var candles = _createCandles(candleData);
        Logger.log("Candles Created: Length %s", candles.length);
        _setLastCandleDate(candles);
        CandleModule.CandleApp.save(candles);
    };
    function _getCandleDataFromFinnhub(){
        var httpRequest = HttpModule.HttpRequestBuilderFactory.getBuilder()
            .setBaseUrl(baseUrl)
            .setMethod("get")
            .addPath("stock")
            .addPath("candle")
            .addQuery("token", apiKey)
            .addQuery("symbol", "MSFT")
            .addQuery("resolution", candleResolutionMinutes)
            // .addQuery("count", 60)
            .addQuery("from", Math.floor(fromMs/1000))
            .addQuery("to", Math.ceil(toMs/1000))
            .build();
        var httpSender = HttpModule.HttpSenderBuilderFactory.getBuilder().build();
        return JSON.parse(httpSender.getResponse(httpRequest));
    }
    function _createCandles(candleData){
        var candles = [];
        if(candleData.s === "ok"){
            candleData.t.forEach(function(timestamp, index){
                var candle = CandleModule.CandleBuilderFactory.getBuilder()
                    .setTimestamp(timestamp * 1000)
                    .setSymbol("MSFT")
                    .setOpenPrice(candleData.o[index])
                    .setHighestPrice(candleData.h[index])
                    .setLowestPrice(candleData.l[index])
                    .setClosePrice(candleData.c[index])
                    .setVolume(candleData.v[index])
                    .setResolution(candleResolutionMinutes * 60)
                    .build();
                candles.push(candle);
            });
        }
        return candles;
    }
    function _setLastCandleDate(candles) {
        var lastCandle = BaseModule.Helper.getLastElement(candles);
        PropertiesService.getScriptProperties().setProperty("candleSync.lastCandleDatetime", lastCandle.getDate().toISOString());
    }
}