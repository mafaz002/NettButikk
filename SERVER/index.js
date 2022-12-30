const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
