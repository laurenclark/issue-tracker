const issues = [
    {
        id: 1,
        status: 'New',
        owner: 'Ravan',
        effort: 5,
        created: new Date('2018-08-15'),
        due: undefined,
        title: 'Error in console when clicking Add'
    },
    {
        id: 2,
        status: 'Assigned',
        owner: 'Eddie',
        effort: 14,
        created: new Date('2018-08-16'),
        due: new Date('2018-08-30'),
        title: 'Missing bottom border on panel'
    }
];

class IssueFilter extends React.Component {
    render() {
        return <div>This is a placeholder for the issue filter.</div>;
    }
}

class IssueRow extends React.Component {
    render() {
        const issue = this.props.issue;
        return (
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                {/*  💡 We always check the property exists as a truthy value before we perform a method on it */}
                <td>{issue.due ? issue.due.toDateString() : ''}</td>
                <td>{issue.title}</td>
            </tr>
        );
    }
}

class IssueTable extends React.Component {
    render() {
        // 💡 You should always use a unique identifier from the dataset like an ID
        // Never use the Array index (things.indexOf(thing))
        // This is because if an item is removed/changed, React uses that identifier
        // decide whether or not to re-render, so you would always be rerendering on deletion
        // which is unperformant and defeats the purpose of using a reactive library
        // it can also cause a bug where React doesn't know which item to remove in order
        // See: https://stackoverflow.com/questions/46735483/error-do-not-use-array-index-in-keys
        const issueRows = issues.map(issue => (
            <IssueRow key={issue.index} issue={issue} />
        ));

        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Due Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {issues.map(issue => (
                        <IssueRow key={issue.id} issue={issue} />
                    ))} */}
                    {issueRows}
                </tbody>
            </table>
        );
    }
}

class IssueAdd extends React.Component {
    render() {
        return <div>This is a placeholder for a form to add an issue.</div>;
    }
}

class IssueList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
            </React.Fragment>
        );
    }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
