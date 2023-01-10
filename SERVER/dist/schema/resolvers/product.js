import { GraphQLError } from "graphql";
const errorMessage = "Unable to connect to the database";
export const productResolver = {
    Query: {
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
    },
    Mutation: {
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
    }
};
