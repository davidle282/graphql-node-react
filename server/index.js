const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

const PORT = process.env.PORT || 4000;

mongoose
  .connect("mongodb://localhost:27017/movie-graphql")
  .then(() => {
    console.log("Mongodb Connected");
    return server.listen({port: PORT});
  })
  .then((res) => {
    console.log("Server is running at ", res.url);
  })
  .catch((err) => {
    console.log(err);
  });
