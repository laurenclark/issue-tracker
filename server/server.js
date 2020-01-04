// Set up our Express server to serve static assets
const express = require('express');
const app = express();
const port = 3000;

/**
 * Static Server Middleware
 *
 * @param {String} root - Public directory / Dist / Src
 * @param {Object} options
 */
const fileServerMiddleware = express.static('public');

/**
 * Mount with 'Use'
 *
 * @param {String} Path - Defaults to '/'
 * @param {Function} Handler
 */
app.use('/', fileServerMiddleware);

// Run with `$ node server.js`
app.listen(port, () => {
    console.log(`App started on ${port}`);
});
