import { GraphQLError } from "graphql";
import { errorMessage } from "./index";
const Mutation = {
    async addProduct(_, args, { db }) {
        try {
            const product = await db.create(args, "products");
            return product;
        }
        catch {
            throw new GraphQLError(errorMessage);
        }
    },
    async updateProduct(_, args, { db }) {
        try {
            const updatedProduct = await db.update(args, "products");
            return updatedProduct;
        }
        catch {
            throw new GraphQLError(errorMessage);
        }
    },
    async deleteProduct(_, { id }, { db }) {
        try {
            const deletedProduct = await db.delete(id, "products");
            return deletedProduct;
        }
        catch {
            throw new GraphQLError(errorMessage);
        }
    }
};
export default Mutation;
