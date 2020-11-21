const mutationResolvers = require("./mutationResolvers");
const queryResolvers = require("./queryResolvers");
const { gql } = require("apollo-server-express");
const listTypeDefs = gql`
  input insertListInput {
    title: String!
    label: String!
    pos: Int!
  }
  input updateListPosInput {
    listId: String!
    pos: Int!
  }
  type List {
    id: ID!
    title: String!
    label: String!
    pos: Int!
    description: String
    items: [Item]
  }
  extend type Query {
    hello: String
    fetchLists: [List]
  }
  extend type Mutation {
    insertList(request: insertListInput): List
    updateListPos(request: updateListPosInput): List
  }
`;
const sectionResolvers = {
  Query: {
    ...queryResolvers,
  },
  Mutation: {
    ...mutationResolvers,
  },
};
module.exports = {
  listTypeDefs,
  listResolvers,
};

