const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_USER,
    port: 5432,
    ssl: false,
    password: process.env.DB_PASSWORD,
})

module.exports.getConnection = async () => (
    await pool.connect()
)

module.exports.close = async () => {
    await oracledb.getPool().close(0);
}

