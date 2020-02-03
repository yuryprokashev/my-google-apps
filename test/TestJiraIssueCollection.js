/**
 * Constructs the collection of TestJiraIssue objects
 * @param baseModule {BaseModule}
 * @param testModule {TestModule}
 * @constructor
 */
function TestJiraIssueCollection(baseModule, testModule) {
    var yprokashev = testModule.jiraUserCollection.getBy("name", "yprokashev");
    var mani = testModule.jiraUserCollection.getBy("name", "manimaran.selvan");
    var issues = [
        new TestJiraIssue("CENPRO-1", "Backlog", yprokashev),
        new TestJiraIssue("CENPRO-2", "In Progress", mani)
    ];
    var indexByKey = baseModule.IndexFactory.getBuilder()
        .setIndexedPropertyName("key")
        .setStorageMap(baseModule.MapFactory.getBuilder().build())
        .build();
    var jiraIssueCollection = baseModule.CollectionFactory.getBuilder()
        .setInstances(issues)
        .addPropertyIndex(indexByKey)
        .build();

    this.getAll = function () {
        return jiraIssueCollection.getAll();
    };
    this.getBy = function (propertyKey, propertyValue) {
        return jiraIssueCollection.getBy(propertyKey, propertyValue);
    };
}