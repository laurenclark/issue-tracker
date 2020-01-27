// Set up our Express server to serve static assets
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

let aboutMessage = 'Issue Tracker API v1.0';

const resolvers = {
    Query: {
        about: () => aboutMessage
    },
    Mutation: {
        setAboutMessage
    }
};

const typeDefs = `
  type Query {
    about: String!
  }
  type Mutation {
    setAboutMessage(message: String!): String
  }`;

function setAboutMessage(_, { message }) {
    return (aboutMessage = message);
}

const server = new ApolloServer({
    typeDefs,
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
