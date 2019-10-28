/**
 * Constructs the collection of TestJiraUser objects
 * @param baseModule
 * @constructor
 */
function TestJiraUserCollection(baseModule) {
    var users = [
        new TestJiraUser("yprokashev", "Yury Prokashev", "yury.prokashev@aurea.com"),
        new TestJiraUser("manimaran.selvan", "Manimaran Selvan", "manimaran.selvan@devfactory.com")
    ];
    var indexByUsername = baseModule.IndexFactory.getPropertyIndexBuilder()
        .setIndexedPropertyName("username")
        .setStorageIndex(baseModule.IndexFactory.createOneToOneIndex())
        .build();
    this.prototype = baseModule.CollectionFactory.getBuilder()
        .setInstances(users)
        .addPropertyIndex(indexByUsername)
        .build();
}