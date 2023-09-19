const pool = require('../db');

const updateMondayTextsSent = async (textsSent) => {
    const res = await pool.query(`UPDATE monday_texts_sent SET textsSent=($1)`, [textsSent]);
}

const fetchMondayTextsSent = async () => {
    const res = await pool.query(`SELECT * FROM monday_texts_sent`);

    return res.rows[0].textssent;
}

module.exports = { updateMondayTextsSent, fetchMondayTextsSent };

/*

const createMondayTextsSentQuery = `CREATE TABLE monday_texts_sent (
    textsSent BOOLEAN
)`
*/