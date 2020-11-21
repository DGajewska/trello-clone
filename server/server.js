const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const merge = require("lodash/merge");
const mongoose = require("mongoose");
const { PubSub } = require("apollo-server");
const { createServer } = require("http");

require("dotenv").config();
const { listResolvers, listTypeDefs } = require("./list");
const { itemResolvers, itemTypeDefs } = require("./item");

const listModel = require("./list/model");
const itemModel = require("./item/model");
const SUBSCRIPTION_CONSTANTS = require('./subscriptionConstants')

const typeDefs = gql`
type Subscription {
    listAdded: List
    itemAdded: Item
    onListPosChange: List
    onItemPosChange: Item
  }
  ${itemTypeDefs}
  ${listTypeDefs}
`;

const pubsub = new PubSub();

const SubscriptionsResolvers = {
  Subscription: {
    listAdded: {
      subscribe: () =>
        pubsub.asyncIterator([SUBSCRIPTION_CONSTANTS.LIST_ADDED]),
    },
    itemAdded: {
      subscribe: () =>
        pubsub.asyncIterator([SUBSCRIPTION_CONSTANTS.ITEM_ADDED]),
    },
    onListPosChange: {
      subscribe: () =>
        pubsub.asyncIterator([SUBSCRIPTION_CONSTANTS.ON_LIST_POS_CHANGE]),
    },
    onItemPosChange: {
      subscribe: () =>
        pubsub.asyncIterator([SUBSCRIPTION_CONSTANTS.ON_ITEM_POS_CHANGE]),
    },
  },
};

const customResolvers = {
  List: {
    items(parent, args, cxt) {
      return cxt.item.getItemByListId(parent._id);
    },
  },
};

const resolvers = merge(
  itemResolvers,
  listResolvers,
  customResolvers,
  SubscriptionsResolvers
);

const MONGO_USER = process.env.MONGO_USER || "root";
const MONGO_PASS = process.env.MONGODB_PASS;
mongoose
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASS}@ds131902.mlab.com:31902/trello-hooks-graphql-clone`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("mongodb connected successfully");
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({
        item: itemModel,
        list: listModel,
        publisher: pubsub,
        SUBSCRIPTION_CONSTANTS: SUBSCRIPTION_CONSTANTS
      })
    });

    const app = express();
    server.applyMiddleware({ app });

    const httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer)

    const PORT = process.env.PORT || 4444;
    httpServer.listen({ port: PORT }, () => {
      console.log(`Server is running in port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });