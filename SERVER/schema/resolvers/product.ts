import { GraphQLError } from "graphql";
import Connection from "../../database/connection";
interface ID {
  id: number;
}

interface Product extends ID {
  name: string;
  quantity: number;
  price: number;
}

interface UpdateProduct extends ID {
  name?: string;
  quantity?: number;
  price?: number;
}

interface DATABASE {
  db: Connection;
}

const errorMessage = "Unable to connect to the database";

export const productResolver = {
  Query: {
    async getAllProducts(_: unknown, __: unknown, { db }: DATABASE) {
      try {
        const products = await db.queryAll("products");
        return products;
      } catch {
        throw new GraphQLError(errorMessage);
      }
    },
    async getProductById(_: unknown, { id }: ID, { db }: DATABASE) {
      try {
        const product = await db.queryById(id, "products");
        return product;
      } catch {
        throw new GraphQLError(errorMessage);
      }
    }
  },
  Mutation: {
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
  }
};
