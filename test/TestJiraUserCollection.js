/**
 * Constructs the collection of TestJiraUser objects
 * @constructor
 */
function TestJiraUserCollection(baseModule) {
    var users = [
        new TestJiraUser("yprokashev", "Yury Prokashev", "yury.prokashev@aurea.com", "P2TPM", 39),
        new TestJiraUser("manimaran.selvan", "Manimaran Selvan", "manimaran.selvan@devfactory.com", "P2TPM", 30)
    ];
    var indexByUsername = baseModule.IndexFactory.getBuilder()
        .setIndexedPropertyName("name")
        .setStorageMap(baseModule.MapFactory.getBuilder().build())
        .build();
    var jiraUserCollection = baseModule.CollectionFactory.getBuilder()
        .setInstances(users)
        .addPropertyIndex(indexByUsername)
        .build();
    this.getAll = function () {
        return jiraUserCollection.getAll();
    };
    this.getBy = function (propertyName, propertyValue) {
        return jiraUserCollection.getBy(propertyName, propertyValue);
    };
}