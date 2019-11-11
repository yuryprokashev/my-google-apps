function TestModule(baseModule, mappingModule) {
    this.jiraUserCollection = new TestJiraUserCollection(baseModule);
    this.jiraIssueCollection = new TestJiraIssueCollection(baseModule, this);
    this.propertyMappingRulesCollection = new TestPropertyMappingRuleCollection(baseModule, mappingModule);
    this.objectMappingRuleCollection = new TestObjectMappingRuleCollection(baseModule, mappingModule, this);
}