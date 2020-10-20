module.exports = {
  client: {
    service: {
      name: 'test-sanctuary-server',
      localSchemaFile: '../server/src/schema.gql',
    },
    includes: ['./pages/**/*.tsx', './components/**/*.tsx'],
  },
};
