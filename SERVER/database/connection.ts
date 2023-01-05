const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

class Connection {
  table: string;
  db: typeof Client;

  constructor(table: string) {
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

  getPlaceHolders(length: number): string {
    const res = [];

    for (let count = 1; count <= length; count++) {
      res.push(`$${count}`);
    }

    return res.join(",");
  }

  async queryAll(): Promise<Array<Record<string, unknown>>> {
    const queryString = `SELECT * FROM ${this.table}`;

    try {
      const result = await this.db.query(queryString);
      this.db.end();
      return result.rows;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async queryById(id: number): Promise<Record<string, unknown>> {
    const queryString = `SELECT * FROM ${this.table} WHERE id=${id}`;

    try {
      const result = await this.db.query(queryString);
      this.db.end();
      return result.rows[0];
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async create(
    data: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = this.getPlaceHolders(keys.length);
    const queryString = `INSERT INTO ${this.table}(${keys.join(
      ","
    )}) VALUES(${placeholders}) RETURNING *`;

    try {
      const result = await this.db.query(queryString, values);
      this.db.end();
      return result.rows[0];
    } catch (error: unknown) {
      throw new Error(error as string);
    }
  }

  async update(
    data: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    const keys = Object.keys(data);
    let newValues = "";

    for (const key of keys) {
      if (key === "id") {
        continue;
      }
      newValues = newValues.concat(
        ` ,${key}='${data[key] as string | number}'`
      );
    }

    newValues = newValues.slice(2);

    try {
      const queryString = `UPDATE ${this.table} SET ${newValues} WHERE id=${
        data.id as number
      } RETURNING *`;
      const result = await this.db.query(queryString);
      this.db.end();
      return result.rows[0];
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async delete(id: number): Promise<Record<string, unknown>> {
    const queryString = `DELETE FROM ${this.table} WHERE id=${id} RETURNING *`;

    try {
      const result = await this.db.query(queryString);
      this.db.end();
      return result.rows[0];
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

module.exports = Connection;

export {};
