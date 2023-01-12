import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFiles } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import dotenv from "dotenv";
import Connection from "./database/connection";
import productResolver from "./schema/resolvers/products";
dotenv.config();
const server = new ApolloServer({
    typeDefs: await loadFiles("./schema/typeDefs/**/*.graphql"),
    resolvers: mergeResolvers([productResolver])
});
const { url } = await startStandaloneServer(server, {
    listen: {
        port: process.env.PORT ?? 5000
    },
    context: async () => ({
        db: new Connection()
    })
});
console.log(`Server listening to port ${url}`);
