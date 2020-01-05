const continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
const helloContinents = Array.from(continents, c => `Hello ${c} `);
const message = helloContinents.join('');

const elem = (
    <div className="myClass" title="Outer Div">
        <h1>{message}</h1>
    </div>
);
ReactDOM.render(elem, document.getElementById('content'));
