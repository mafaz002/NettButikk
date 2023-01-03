"use strict";
const { GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLString } = require("graphql");
const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLInt }
    })
});
module.exports = { ProductType };
