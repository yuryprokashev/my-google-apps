/**
 * Constructs the collection of TestJiraIssue objects
 * @param baseModule
 * @param jiraUserCollection
 * @constructor
 */
function TestJiraIssueCollection(baseModule, jiraUserCollection) {
    var yprokashev = jiraUserCollection.getBy("username", "yprokashev");
    var mani = jiraUserCollection.getBy("username", "manimaran.selvan");
    var issues = [
        new TestJiraIssue("CENPRO-1", "Backlog", yprokashev),
        new TestJiraIssue("CENPRO-2", "In Progress", mani)
    ];
    var indexByKey = baseModule.IndexFactory.getPropertyIndexBuilder()
        .setIndexedPropertyName("key")
        .setStorageIndex(baseModule.IndexFactory.createOneToOneIndex())
        .build();
    this.prototype = baseModule.CollectionFactory.getBuilder()
        .setInstances(issues)
        .addPropertyIndex(indexByKey)
        .build();
}