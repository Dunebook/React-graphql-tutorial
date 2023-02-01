import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
  type Todo {
    id: String
    text: String
    completed: Boolean
  }
  type Query {
    todos: [Todo]!
  }
  type Mutation {
    createTodo(text: String!):String
    removeTodo(id: String!):String
    updateTodo(id: String!):String
  }
`;

let todos = [
    {
      id: Date.now().toString(),
      text: 'Hello from GraphQL',
      completed: true,
    },
  ];

  // Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      todos: () => todos,
    },
    Mutation: {
      createTodo: (parent, args, context, info) => {
  
        return todos.push({
          id: Date.now().toString(),
          text: args.text,
          completed: false,
        });
      },
      removeTodo: (parent, args, context, info) => {
        for (let i in todos) {
          if (todos[i].id === args.id) {
            todos.splice(i, 1);
          }
        }
        return args.id;
      },
      updateTodo: (parent, args, context, info) => {
        for (let i in todos) {
          if (todos[i].id === args.id) {
            todos[i].completed = !todos[i].completed;
          }
        }
        return args.id;
      }
    }
  };

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);