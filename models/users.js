const pool = require('./db');

// maybe use bcrypt for phone nums?

// CREATE USER
const createUser = async (phone_number, serveries=[], allergens=[], diets=[]) => {
    const res = await pool.query(`
    INSERT INTO users (phone_number, serveries, allergens, diets, phrase) 
    VALUES ($1, $2, $3, $4)
    `, [phone_number, serveries, allergens, diets])
        .catch((err) => {
            console.error;
        });

    return res;
};

// READ USER
const fetchAllUsers = async () => {
    const res = await pool.query(`SELECT * FROM users`)
        .catch((err) => {
            console.error;
        });
    return res.rows;
};

const fetchUserById = async (id) => {
    const res = await pool.query(`SELECT * FROM users WHERE id=$1`, [id])
        .catch((err) => {
            console.error;
        });

    return res;
};

const fetchUserByPhone = async (phone_number) => {
    const res = await pool.query(`SELECT * FROM users WHERE phone_number=$1`, [phone_number])
        .catch((err) => {
            console.error;
        });

    return res;
}

// DELETE USER
const deleteUser = async (id) => {
    const res = await pool.query(`DELETE * FROM users WHERE id=$1`, [id])
        .catch((err) => {
            console.error;
        });

    return res;
};

module.exports = { createUser, fetchAllUsers, fetchUserById, deleteUser };

/*
const createUsersQuery = `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    phone_number TEXT,
    serveries TEXT[],
    allergens TEXT[],
    diets TEXT[],
    phrase BOOLEAN
)`;
*/