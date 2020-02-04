const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

/**
 * Reviver to see if value is an starts as an
 * ISO date and then return a new Date object.
 *
 * @param {String} key
 * @param {String} value
 */

function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) {
        return new Date(value);
    }
    return value;
}

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
            <tbody>{issueRows}</tbody>
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
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            {/*  💡 We always check the property exists as a truthy value
                    before we perform a method on it */}
            <td>{issue.due ? issue.due.toDateString() : ''}</td>
            <td>{issue.title}</td>
        </tr>
    );
};

class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = {
            owner: form.owner.value,
            title: form.title.value,
            due: new Date(new Date().getTime() + 100 * 60 * 24 * 10)
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

async function graphQLFetch(query, variables = {}) {
    try {
        const response = await fetch('/graphql', {
            // Using post not get as we don't want caching
            method: 'POST',
            // Indicate content is JSON
            headers: { 'Content-Type': 'application/json' },
            // Equiv. "data" in Axios but we need to stringify it manually
            body: JSON.stringify({ query, variables })
        });

        // Await loadData
        const body = await response.text();

        // A "reviver" function which applies some function to each key of the
        // array. We must get the response in plain text (.text()) format
        // or we cannot use the JSON.parse() method, and we cannot use our reviver!
        const result = JSON.parse(body, jsonDateReviver);

        if (result.errors) {
            const error = result.errors[0];
            if (error.extensions.code === 'BAD_USER_INPUT') {
                const details = error.extensions.exception.errors.join('\n ');
                alert(`${error.message}: \n ${details}`);
            } else {
                alert(`${error.extesions.code}: ${error.message}`);
            }
        }

        return result.data;
    } catch (e) {
        alert(`Error in sending data to server: ${e.message}`);
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

        const data = await graphQLFetch(query);
        if (data) {
            this.setState({ issues: data.issueList });
        }
    }

    /**
     * Create an issue - expects an object with at least Owner and Title
     *
     * @param {Object} Issue { Title, Owner[, Due, Status, Effort] }
     */

    async createIssue(issue) {
        const query = `mutation issueAdd($issue: IssueInputs!) {
            issueAdd(issue: $issue) {
                id
            }
        }`;

        const data = await graphQLFetch(query, { issue });
        if (data) {
            this.loadData();
        }
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
