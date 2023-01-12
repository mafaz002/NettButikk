import Query from "./query";
import Mutation from "./mutation";
import Connection from "../../../database/connection";

export interface ID {
  id: number;
}

export interface Product extends ID {
  name: string;
  quantity: number;
  price: number;
}

export interface UpdateProduct extends ID {
  name?: string;
  quantity?: number;
  price?: number;
}

export interface DATABASE {
  db: Connection;
}

export const errorMessage = "Unable to connect to the database";

export default { Query, Mutation };
