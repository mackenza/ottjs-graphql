import express from 'express';
import graphqlHTTP from 'express-graphql';
import Schema from './schema/github';

const app = express();

app.use('/', graphqlHTTP({ schema: Schema, graphiql: true }));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
