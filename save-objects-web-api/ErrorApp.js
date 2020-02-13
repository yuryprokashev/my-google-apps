/**
 *
 * @constructor
 */
function ErrorAppConstructor(BaseModule) {
    var _errorTable;
    var _errorToRowMap;
    var _rowFactory;
    var errorTableUrl = "https://docs.google.com/spreadsheets/d/1edfBmyPPT9Y7WbIoEmtLq9erzY1B2cC95GzjlvR_HWQ/edit";
    var errorSheetName = "Errors";
    this.save = function (errors) {
        if(!_errorTable) _init();
        var errorRows = _rowFactory.createMany(errors);
        _errorTable.save(errorRows);
    };
   function _init() {
       _errorToRowMap = BaseModule.KeyMapBuilderFactory.getBuilder().build();
       _errorToRowMap.set("timestamp", 0);
       _errorToRowMap.set("event", 1);
       _errorToRowMap.set("message", 2);
       _errorToRowMap.set("stack", 3);
       _errorToRowMap.set("sender", 4);
       _errorTable = BaseModule.TableBuilderFactory.getBuilder()
           .setSpreadsheetUrl(errorTableUrl)
           .setSheetName(errorSheetName)
           .setNumberOfColumns(_errorToRowMap.keys().length)
           .build();
       _rowFactory = BaseModule.ObjectToRowFactoryBuilderFactory.getBuilder().setObjectToRowMap(_errorToRowMap).build();
   }
}