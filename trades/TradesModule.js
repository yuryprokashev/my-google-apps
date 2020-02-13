/**
 *
 * @constructor
 */
function TradeModuleConstructor() {
    var baseModule = new BaseModule.BaseModuleConstructor();
    this.FinnhubTradeApp = new FinnhubTradeAppConstructor(baseModule, this);
}