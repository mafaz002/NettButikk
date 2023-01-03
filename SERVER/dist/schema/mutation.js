"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");
const { ProductType } = require("./types");
const Connection = require("../database/connection");
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        addProduct: {
            type: ProductType,
            args: {
                id: { type: GraphQLInt },
                name: { type: GraphQLString },
                quantity: { type: GraphQLInt },
                price: { type: GraphQLInt }
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const db = new Connection("products");
                    const result = yield db.mutate(args);
                    return result;
                });
            }
        }
    })
});
module.exports = RootMutation;
