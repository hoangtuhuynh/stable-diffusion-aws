//https://e4thhmjyq1.execute-api.us-east-1.amazonaws.com/test/stableapp

const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
  target: 'https://e4thhmjyq1.execute-api.us-east-1.amazonaws.com/',
  changeOrigin: true,
};
module.exports = function (app) {
  app.use('/test', createProxyMiddleware(proxy));
};