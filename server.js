const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql');

// Keys holding sensitive data
const keys = require('./config/keys');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type RootQuery {
      viewFigures(date: String!): [Object!]
    }

    type RootMutation {
      uploadFigures(records: [Object!]): [String!]
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    // Get figures to display
    viewFigures: () => {

    },

    // Upload a record of figures and work into a JSON Object
    uploadFigures: (args) => {
      const records = args.records;
    }
  },
  graphiql = true
}));

app.listen(keys.PORT, () => console.log(`Listening on port: ${keys.PORT}`));
