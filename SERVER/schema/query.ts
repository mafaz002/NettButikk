const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} = require("graphql");
const { ProductType } = require("./types");
const Connection = require("../database/connection");

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    getAllProducts: {
      type: new GraphQLList(ProductType),
      async resolve() {
        const db = new Connection("products");
        const result = await db.queryAll();
        return result;
      }
    },
    getProductById: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(_: unknown, args: { id: number }) {
        const db = new Connection("products");
        const result = await db.queryById(args.id);
        return result;
      }
    }
  })
});

module.exports = RootQuery;

export {};
