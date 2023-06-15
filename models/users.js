const pool = require('./db');

// CREATE USER
const createUser = async (phone_number, serveries=[], allergens=[], diets=[], phrase=true) => {
    const res = await pool.query(`
    INSERT INTO users (phone_number, serveries, allergens, diets, phrase) 
    VALUES ($1, $2, $3, $4, $5)
    `, [phone_number, serveries, allergens, diets, phrase])
        .catch((err) => {
            console.error;
        });

    return res;
};

// READ USER
const getUserById = async (id) => {
    const res = await pool.query(`SELECT * FROM users WHERE id=$1`, [id])
        .catch((err) => {
            console.error;
        });

    return res.rows[0];
};

const getUserByPhoneNumber = async (phone_number) => {
    const res = await pool.query(`SELECT * FROM users WHERE phone_number=$1`, [phone_number])
        .catch((err) => {
            console.error;
        });

    return res.rows[0];
}

// UPDATE USER
const updateUser = async (id, phone_number, serveries, allergens, diets, phrase) => {
    const res = await pool.query(`
        UPDATE users 
        SET phone_number=$1, serveries=$2, allergens=$3, diets=$4, phrase=$5
        WHERE id=$6
    `, [id, phone_number, serveries, allergens, diets, phrase])
        .catch((err) => {
            console.error;
        });

    return res;
};

// DELETE USER
const deleteUser = async (id) => {
    const res = await pool.query(`DELETE * FROM users WHERE id=$1`, [id])
        .catch((err) => {
            console.error;
        });

    return res;
}

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