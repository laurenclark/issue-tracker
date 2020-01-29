// Set up our Express server to serve static assets
const express = require('express');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

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

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    /*--------------------------------------------------------------
    ## toISOString()
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
    -   A string representing the given date in the ISO 8601 format 
        according to *universal time*. We do this so that the date from
        the backend is as *universal* as possible and can be converted
        on the client dependent on locale. 

    -   Example - let today = new Date('05 October 2011 14:48 UTC')
        console.log(today.toISOString())  // 2011-10-05T14:48:00.000Z
    --------------------------------------------------------------*/
    serialize(value) {
        return value.toISOString();
    },
    /*--------------------------------------------------------------
    ## If the input is supplied as a Query variable which is a JS object,
    a pre-parsed JSON value. So we just construct the date straight out of that
    --------------------------------------------------------------*/
    parseValue(value) {
        return new Date(value);
    },

    /*--------------------------------------------------------------
    ## AST - [A]bstract [S]yntax [T]ree
    - For our date parser we're only interested if the ast.kind is a string,
    if not we'll set it to undefined so it's treated as an error, because
    it could not be converted how we need it to be.
    --------------------------------------------------------------*/
    parseLiteral(ast) {
        return ast.kind === Kind.STRING ? new Date(ast.value) : undefined;
    }
});

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList
    },
    Mutation: {
        setAboutMessage,
        issueAdd
    },
    GraphQLDate
};

function setAboutMessage(_, { message }) {
    return (aboutMessage = message);
}

function issueAdd(_, { issue }) {
    // Created always gets the date here
    issue.created = new Date();
    // ID++
    issue.id = issuesDB.length + 1;
    if (issue.status === undefined) issue.status = 'New';
    issuesDB.push(issue);
    return issue;
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
