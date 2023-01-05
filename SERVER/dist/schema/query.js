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
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInt } = require("graphql");
const { ProductType } = require("./types");
const Connection = require("../database/connection");
const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        getAllProducts: {
            type: new GraphQLList(ProductType),
            resolve() {
                return __awaiter(this, void 0, void 0, function* () {
                    const db = new Connection("products");
                    const result = yield db.queryAll();
                    return result;
                });
            }
        },
        getProductById: {
            type: ProductType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const db = new Connection("products");
                    const result = yield db.queryById(args.id);
                    return result;
                });
            }
        }
    })
});
module.exports = RootQuery;
