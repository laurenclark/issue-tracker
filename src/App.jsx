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
                            {/*-----------------------------------------------------------------

                            💡  This is passed in as a child of the component with 
                                props.children - or else how could we style the text with 
                                <strong> this is part of React's composition model

                                https://reactjs.org/docs/composition-vs-inheritance.html

                            ------------------------------------------------------------------*/}
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
                {/*-----------------------------------------------------------------

                    💡  We use props.children to pass in styled text or multiple 
                        This is similar to how slots work in Vue, two different
                        ways of nesting content in inside the opening and closing 
                        JSX of a component.

                ------------------------------------------------------------------*/}
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

const issues = [
    /*--------------------------------------------------------------
    ## Due left undefined so we can test case for optional fields
    --------------------------------------------------------------*/
    {
        id: 1,
        status: 'new',
        owner: 'Revan',
        effort: 5,
        created: new Date('2018-08-15'),
        due: undefined,
        title: 'Error in the console when clicking Add'
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

ReactDOM.render(elem, document.getElementById('content'));
