const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} = require("graphql");
const { ProductType } = require("./types");
const Connection = require("../database/connection");

interface CreateProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface UpdateProduct {
  id: number;
  name?: string;
  quantity?: string;
  price?: string;
}

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        price: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(_: unknown, args: CreateProduct) {
        const db = new Connection("products");
        const result = await db.create(args);
        return result;
      }
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLInt }
      },
      async resolve(_: unknown, args: UpdateProduct) {
        const db = new Connection("products");
        const result = await db.update(args);
        return result;
      }
    },
    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(_: unknown, args: { id: number }) {
        const db = new Connection("products");
        const result = await db.delete(args.id);
        return result;
      }
    }
  })
});

module.exports = RootMutation;

export {};
