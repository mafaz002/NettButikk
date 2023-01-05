const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 4000;

app.use("/graphql", graphqlHTTP({ schema }));

app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
