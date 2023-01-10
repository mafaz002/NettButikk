import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
class Connection {
    constructor() {
        const { Client } = pg;
        const { HOST, USER, PASSWORD, DATABASE, DB_PORT } = process.env;
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
    async queryAll(table) {
        const queryString = `SELECT * FROM ${table}`;
        try {
            const result = await this.db.query(queryString);
            this.db.end();
            return result.rows;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async queryById(id, table) {
        const queryString = `SELECT * FROM ${table} WHERE id=${id}`;
        try {
            const result = await this.db.query(queryString);
            this.db.end();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async create(data, table) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = this.getPlaceHolders(keys.length);
        const queryString = `INSERT INTO ${table}(${keys.join(",")}) VALUES(${placeholders}) RETURNING *`;
        try {
            const result = await this.db.query(queryString, values);
            this.db.end();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async update(data, table) {
        const keys = Object.keys(data);
        let newValues = "";
        for (const key of keys) {
            if (key === "id") {
                continue;
            }
            newValues = newValues.concat(` ,${key}='${data[key]}'`);
        }
        newValues = newValues.slice(2);
        try {
            const queryString = `UPDATE ${table} SET ${newValues} WHERE id=${data.id} RETURNING *`;
            const result = await this.db.query(queryString);
            this.db.end();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async delete(id, table) {
        const queryString = `DELETE FROM ${table} WHERE id=${id} RETURNING *`;
        try {
            const result = await this.db.query(queryString);
            this.db.end();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
export default Connection;
