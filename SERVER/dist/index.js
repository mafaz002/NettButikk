"use strict";
var _a;
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
