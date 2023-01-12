import { GraphQLError } from "graphql";
import { ID, Product, UpdateProduct, DATABASE, errorMessage } from "./index";

const Mutation = {
  async addProduct(_: unknown, args: Product, { db }: DATABASE) {
    try {
      const product = await db.create(
        args as unknown as Record<string, unknown>,
        "products"
      );
      return product;
    } catch {
      throw new GraphQLError(errorMessage);
    }
  },
  async updateProduct(_: unknown, args: UpdateProduct, { db }: DATABASE) {
    try {
      const updatedProduct = await db.update(
        args as unknown as Record<string, unknown>,
        "products"
      );
      return updatedProduct;
    } catch {
      throw new GraphQLError(errorMessage);
    }
  },
  async deleteProduct(_: unknown, { id }: ID, { db }: DATABASE) {
    try {
      const deletedProduct = await db.delete(id, "products");
      return deletedProduct;
    } catch {
      throw new GraphQLError(errorMessage);
    }
  }
};

export default Mutation;
