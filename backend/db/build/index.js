"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const processEnv = process.env;
//pool connection
const { Pool } = pg_1.default;
const pool = new Pool({
    user: processEnv.POSTGRES_USER,
    password: processEnv.POSTGRES_PASSWORD,
    database: processEnv.POSTGRES_DB,
});
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});
async function query(text, params, callback) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
}
exports.query = query;
//# sourceMappingURL=index.js.map