class IssueFilter extends React.Component {
    render() {
        return <div>This is a placeholder for the issue filter.</div>;
    }
}
const IssueTable = props => {
    // 💡 You should always use a unique identifier from the dataset like an ID
    // Never use the Array index (things.indexOf(thing))
    // This is because if an item is removed/changed, React uses that identifier
    // decide whether or not to re-render, so you would always be rerendering on deletion
    // which is unperformant and defeats the purpose of using a reactive library
    // it can also cause a bug where React doesn't know which item to remove in order
    // See: https://stackoverflow.com/questions/46735483/error-do-not-use-array-index-in-keys
    const issueRows = props.issues.map(issue => (
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
};

const IssueRow = props => {
    const issue = props.issue;
    return (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            {/* This will always be here or else the  issue wasn't created :p */}
            {/* <td>{ issue.created.toDateString()}</td> */}
            <td>{issue.created}</td>
            <td>{issue.effort}</td>
            {/*  💡 We always check the property exists as a truthy value
                        before we perform a method on it */}
            {/* <td>{ issue.due ?  issue.due.toDateString() : ''}</td> */}
            <td>{issue.due}</td>
            <td>{issue.title}</td>
        </tr>
    );
};

class IssueAdd extends React.Component {
    constructor() {
        super();
        // setTimeout(() => {
        //     this.props.createIssue(sampleIssue);
        // }, 2000);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = {
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            effort: form.effort.value
        };
        this.props.createIssue(issue);
    }
    render() {
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="Title" />
                <input type="number" name="effort" placeholder="1" />
                <button>Add</button>
            </form>
        );
    }
}

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        // Before we bound this to the context it was executed in, but we may
        // as well add it to the constructor here of the main parent component,
        // this is because it will always need to be bound, so let's just do it
        // one time.
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const query = `query{
            issueList {
                id
                title 
                status 
                owner 
                created 
                effort 
                due
            }
        }`;

        // Await loadData
        const response = await fetch('/graphql', {
            // Using post not get as we dont' want caching
            method: 'POST',
            // Indicate content is JSON
            headers: { 'Content-Type': 'application/json' },
            // Equiv "data" in Axios but we need to stringify it manually
            body: JSON.stringify({ query })
        });

        const result = await response.json();
        this.setState({ issues: result.data.issueList });
    }

    /**
     * Create an issue - expects an object with at least Owner and Title
     *
     * @param {Object} Issue - Owner, Title, (Due Date, Effort)
     */

    createIssue(issue) {
        // Basic incremento spell
        issue.id = this.state.issues.length + 1;
        issue.created = new Date();
        // Nothing specified so we're just copying the current array
        const newIssueList = this.state.issues.slice();
        newIssueList.push(issue);
        this.setState({ issues: newIssueList });
    }
    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </React.Fragment>
        );
    }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
