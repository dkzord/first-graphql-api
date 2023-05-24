import { ApolloServer, gql } from 'apollo-server';
import { randomUUID } from 'node:crypto';

/*
  -> Under Fetching
      When the HTTP route returns less data than necessary

  -> Over Fetching
      When the HTTP route returns more data than necessary

  -> Schema First: It is example
  -> Code First:
*/

const typeDefs = gql`
  type User {
    id: String!,
    name: String!,
  },

  type Query {
    users: [User!]!,
  },

  type Mutation {
    createUser(name: String!): User!,
  },
`;

interface User {
  id: string;
  name: string;
}

const users: User[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => users,
    },

    Mutation: {
      createUser: (_, args) => {
        const user = {
          id: randomUUID(),
          name: args.name,
        }

        users.push(user);

        return user;
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});