const { GraphQLObjectType } = require("graphql");
const { ProductType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    getProduct: {
      type: ProductType,
      resolve() {
        return {
          id: 1,
          name: "Book",
          quantity: 1,
          price: 100
        };
      }
    }
  })
});

module.exports = RootQuery;

export {};
