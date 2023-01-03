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
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
class Connection {
    constructor(table) {
        const { HOST, USER, PASSWORD, DATABASE, DB_PORT } = process.env;
        this.table = table;
        this.db = new Client({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE,
            port: DB_PORT
        });
        this.db.connect();
    }
    getPlaceHolders(length) {
        const res = [];
        for (let count = 1; count <= length; count++) {
            res.push(`$${count}`);
        }
        return res.join(",");
    }
    mutate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(data);
            const values = Object.values(data);
            const placeholders = this.getPlaceHolders(keys.length);
            const queryString = `INSERT INTO ${this.table}(${keys.join(",")}) VALUES(${placeholders}) RETURNING *`;
            try {
                const result = yield this.db.query(queryString, values);
                this.db.end();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
module.exports = Connection;
