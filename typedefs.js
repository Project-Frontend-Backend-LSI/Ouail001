const {gql} = require('apollo-server-express');
const User = require('./user');

const typeDefs = gql`
  type User {
    id: ID
    username: String!
    email: String!
    password: String!
    country: String
    phone: String!
    description: String
  }
  type Query {
    users: [User]
    userById(id: ID!): User
    userLogin(username: String!,password:String!): User
  }
  type Mutation {
    createUser(username:String!, email:String!,password:String!,country:String!,phone:String!,description:String!): User
    updateUser(id:ID!, username:String, email:String,password:String,country:String,phone:String,description:String): User
    deleteUser(id: ID!): User
  }
`;

module.exports = typeDefs;