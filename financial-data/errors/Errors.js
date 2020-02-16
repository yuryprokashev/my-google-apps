function ErrorsConstructor(){
    var baseModule = new Base.BaseModuleConstructor();
    const errorsSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1edfBmyPPT9Y7WbIoEmtLq9erzY1B2cC95GzjlvR_HWQ/edit";
    this.ErrorApp = baseModule.ObjectAppBuilderFactory.getBuilder()
        .setSpreadsheetUrl(errorsSpreadsheetUrl)
        .setSheetName("Errors")
        .addObjectToRowMapping("timestamp", 0)
        .addObjectToRowMapping("sender", 1)
        .addObjectToRowMapping("event", 2)
        .addObjectToRowMapping("message", 3)
        .addObjectToRowMapping("stack", 4)
        .build();
}