import { GraphQLError } from "graphql";
import { errorMessage } from "./index";
const Query = {
    async getAllProducts(_, __, { db }) {
        try {
            const products = await db.queryAll("products");
            return products;
        }
        catch {
            throw new GraphQLError(errorMessage);
        }
    },
    async getProductById(_, { id }, { db }) {
        try {
            const product = await db.queryById(id, "products");
            return product;
        }
        catch {
            throw new GraphQLError(errorMessage);
        }
    }
};
export default Query;
