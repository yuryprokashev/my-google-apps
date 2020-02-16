function doPost(googleHttpEvent){
    var objectAppRepository = new ObjectAppRepositoryConstructor();
    try{
        var payload = JSON.parse(googleHttpEvent.postData.contents);
        var objectApp = objectAppRepository.getById(payload.objectType);
        objectApp.save(payload.items);
        return ContentService.createTextOutput(JSON.stringify(googleHttpEvent));
    } catch (e) {
        var errorApp = objectAppRepository.getById("Error");
        var error = new Errors.ErrorBuilderFactoryConstructor().getBuilder()
            .setContextEvent(googleHttpEvent)
            .setStackTrace(e.stack)
            .setErrorMessage(e.message)
            .setTimestamp(new Date().valueOf())
            .setSenderName("WebApp.doPost")
            .build();
        errorApp.save(error);
        return ContentService.createTextOutput("event:\n" + JSON.stringify(googleHttpEvent)+"\nerror: " + e.message + "\nstack: " + e.stack);
    }
}