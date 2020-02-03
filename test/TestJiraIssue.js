function TestJiraIssue(key, statusName, assignee) {
    this.key = key;
    this.fields = {
        status: {
            name: statusName
        },
        assignee: assignee
    };
}