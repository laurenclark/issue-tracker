// Set up our Express server to serve static assets
const express = require('express');
const app = express();
const port = 3000;

let aboutMessage = `Issue Tracker API v1.0`;

const resolvers = {
    Query: {
        about: () => aboutMessage
    },
    Mutation: {}
};

const typeDefs = `
    type Query {
        about: String!
    }
    type Mutation {
        setAboutMessage(message: String!) :String;
    }
`;

function setAboutMessage(_, { message }) {
    return (aboutMessage = message);
}

/**
 * Mount with 'Use'
 *
 * @param {String} Path - Defaults to '/'
 * @param {Function} Handler
 */
app.use(express.static('public'));

// Run with `$ node server.js`
app.listen(port, () => {
    console.log(`App started on ${port}`);
});
