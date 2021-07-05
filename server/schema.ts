const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        id: Int!
        login: String!
        email: String!
    }
    
    type Item{
        title: String!,
        creator: String!
    }
    
    type Query {
        current: User
    }
   
    type Mutation {
        register(login: String!, password: String!, email: String!): String
        login(login: String!, password: String!): String
        resetPassword(email: String!): String
        getAllRecords(token: String!): String
        verifyToken(token: String!): String
        addRecord(title: String!, creator: String!): String
    }
`;

module.exports = typeDefs;