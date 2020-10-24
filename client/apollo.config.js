module.exports = {
  client: {
    service: {
      name: 'test-sanctuary-server',
      localSchemaFile: '../server/src/schema.gql',
    },
    includes: ['./src/lib/graphql/**/*.ts'],
  },
};
