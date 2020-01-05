class IssueFilter extends React.Component {
    render() {
        return <div>This is a placeholder for the issue filter.</div>;
    }
}

class IssueTable extends React.Component {
    render() {
        return <div>This is a placeholder for a table of issues</div>;
    }
}

class IssueAdd extends React.Component {
    render() {
        return <div>This is a placeholder for a form to add a new issue</div>;
    }
}
class IssueList extends React.Component {
    render() {
        return (
            <>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
            </>
        );
    }
}

const elem = <IssueList />;

ReactDOM.render(elem, document.getElementById('content'));
