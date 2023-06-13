require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    password: process.env.DATABASE_PWD
});

module.exports = pool;