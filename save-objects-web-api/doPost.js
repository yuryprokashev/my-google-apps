function doPost(googleHttpEvent){
    try{
        var payload = JSON.parse(googleHttpEvent.postData.contents);
        var objectApp = new ObjectAppRepositoryConstructor().getById(payload.objectType);
        objectApp.save(payload.items);
        return ContentService.createTextOutput(JSON.stringify(googleHttpEvent));
    } catch (e) {
        return ContentService.createTextOutput("event:\n" + JSON.stringify(googleHttpEvent)+"\nerror: " + e.message + "\nstack: " + e.stack);
    }
}