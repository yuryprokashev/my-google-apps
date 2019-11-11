function TestModule(baseModule, mappingModule) {
    this.jiraUserCollection = new TestJiraUserCollection(baseModule);
    this.jiraIssueCollection = new TestJiraIssueCollection(baseModule, this);
    this.propertyMappingRulesCollection = new TestPropertyMappingRuleCollection(baseModule, mappingModule);
    this.objectMappingRuleCollection = new TestObjectMappingRuleCollection(baseModule, mappingModule, this);
    this.propertyMapper = new TestPropertyMapper(baseModule, mappingModule, this);
    this.objectMapper = mappingModule.ObjectMapperFactory.getBuilder()
        .setPropertyMapper(this.propertyMapper)
        .build();
    this.mapper = mappingModule.MapperFactory.getBuilder()
        .setObjectMapper(this.objectMapper)
        .setObjectMappingRuleCollection(this.objectMappingRuleCollection)
        .build();
}