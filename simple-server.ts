import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    helloWorld: String!
  }

  type Mutation {
    createUser(name: String!): String!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      helloWorld: () => 'Hello world!',
    },

    Mutation: {
      createUser: (parent, args, ctx) => {
        console.log(args);
        return `Hello DKzinho!`;
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});