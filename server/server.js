// Set up our Express server to serve static assets
const express = require('express');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');

let aboutMessage = 'Issue Tracker API v1.0';

const issuesDB = [
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

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList
    },
    Mutation: {
        setAboutMessage
    }
};

function setAboutMessage(_, { message }) {
    return (aboutMessage = message);
}

function issueList() {
    return issuesDB;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers
});

const app = express();
const port = 3000;

/**
 * Mount with 'Use'
 *
 * @param {String} Path - Defaults to '/'
 * @param {Function} Handler
 */
app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

// Run with `$ node server.js`
app.listen(port, () => {
    console.log(`App started on ${port}`);
});
