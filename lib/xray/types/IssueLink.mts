export type IssueLink = {
    type: {
        outward: string
    }
    outwardIssue: {
        key: string
        fields: {
            summary: string
        }
    }
}
