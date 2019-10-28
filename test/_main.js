function TestModule(baseModule) {
    this.jiraUserCollection = new TestJiraUserCollection(baseModule);
    this.jiraIssueCollection = new TestJiraIssueCollection(baseModule, this.jiraUserCollection);
}