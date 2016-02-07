'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _github = require('./schema/github');

var _github2 = _interopRequireDefault(_github);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use('/', (0, _expressGraphql2.default)({ schema: _github2.default, graphiql: true }));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});