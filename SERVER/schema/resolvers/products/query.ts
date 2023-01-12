import { GraphQLError } from "graphql";
import { ID, DATABASE, errorMessage } from "./index";

const Query = {
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
};

export default Query;
