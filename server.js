const express = require('express');
const app = express();
const fileServerMiddleware = express.static('public');

app.use('/', fileServerMiddleware);
