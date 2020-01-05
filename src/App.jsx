class IssueFilter extends React.Component {
    render() {
        return <div>This is a placeholder for the issue filter.</div>;
    }
}

class IssueTable extends React.Component {
    render() {
        const rowStyle = { border: '1px solid silver', padding: 4 };
        return (
            <table style={{ borderCollapse: 'collapse' }} border="4">
                <thead>
                    <tr>
                        <th style={rowStyle}>ID</th>
                        <th style={rowStyle}>Title</th>
                    </tr>
                </thead>
                <tbody>
                    <IssueRow rowStyle={rowStyle} issue_id={1}>
                        Error in console when clicking add.
                    </IssueRow>
                    <IssueRow rowStyle={rowStyle} issue_id={2}>
                        <div>
                            Missing <strong>bottom</strong> border on panel
                        </div>
                    </IssueRow>
                </tbody>
            </table>
        );
    }
}
class IssueRow extends React.Component {
    render() {
        const style = this.props.rowStyle;
        return (
            <tr>
                <td style={style}>{this.props.issue_id}</td>
                {/* 💡 We use props.children to pass in styled text or multiple  */}
                {/* elements which are nested as children of the parent componet */}
                <td style={style}>{this.props.children}</td>
            </tr>
        );
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
