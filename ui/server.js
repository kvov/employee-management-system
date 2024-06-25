const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
require('dotenv').config();

const API_PROXY_TARGET = process.env.API_PROXY;
app.use('/graphql', createProxyMiddleware({ target: API_PROXY_TARGET, changeOrigin: true }));
app.use(express.static('public'));
app.listen(8000, () => {
    console.log('UI started on port 8000');
});