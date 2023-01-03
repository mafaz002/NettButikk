const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");
const { ProductType } = require("./types");
const Connection = require("../database/connection");

interface ProductArgs {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLInt }
      },
      async resolve(_: unknown, args: ProductArgs) {
        const db = new Connection("products");
        const result = await db.mutate(args);
        return result;
      }
    }
  })
});

module.exports = RootMutation;

export {};
