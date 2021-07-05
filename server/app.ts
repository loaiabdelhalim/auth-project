import express from 'express';
const { ApolloServer, gql } = require('apollo-server-express');
const jwt = require("express-jwt");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const JWT_SECRET = "sdlkfoish23@#$dfdsknj23ST"

const app = express();
const auth = jwt({
    secret: JWT_SECRET,
    credentialsRequired: false,
    algorithms: ['sha1', 'RS256', 'HS256'],
});
app.use(auth);


const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: "/graphql",
    },
    context: ({ req }) => {
        const user = req.headers.user
            ? JSON.parse(req.headers.user)
            : req.user
            ? req.user
            : null;
        return { user };
    },
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("The server started on port " + PORT);
});