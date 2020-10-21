module.exports = {
  client: {
    service: {
      name: 'test-sanctuary-server',
      localSchemaFile: '../server/src/schema.gql',
    },
    includes: ['./lib/graphql/**/*.ts'],
  },
};
