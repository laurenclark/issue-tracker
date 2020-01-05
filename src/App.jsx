class HelloWorld extends React.Component {
    render() {
        const continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
        const helloContinents = Array.from(continents, c => `Hello ${c} `);
        const message = helloContinents.join('');
        return (
            <div className="myClass" title="Outer Div">
                <h1>{message}</h1>
            </div>
        );
    }
}

const elem = <HelloWorld />;

ReactDOM.render(elem, document.getElementById('content'));
