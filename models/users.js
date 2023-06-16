const pool = require('./db');

// maybe use bcrypt for phone nums?

// CREATE USER
const insertUser = async (phone_number, serveries = [], allergens = [], diets = []) => {
    const res = await pool.query(`
    INSERT INTO users (phone_number, serveries, allergens, diets) 
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `, [phone_number, serveries, allergens, diets])
        .catch((err) => {
            console.error(`Error inserting user into database: ${err}`);
            throw err;
        });

    return res.rows[0];
};

// READ USER
const fetchAllUsers = async () => {
    const res = await pool.query(`SELECT * FROM users`)
        .catch((err) => {
            console.error(`Error fetching all users: ${err}`);
            throw err;
        });

    return res.rows;
};

const fetchUserById = async (id) => {
    const res = await pool.query(`SELECT * FROM users WHERE id=$1`, [id])
        .catch((err) => {
            console.error(`Error fetching user by id ${err}`);
            throw err;
        });

    return res.rows[0];
};

const fetchUserByPhone = async (phone_number) => {
    const res = await pool.query(`SELECT * FROM users WHERE phone_number=$1`, [phone_number])
        .catch((err) => {
            console.error(`Error fetching user by phone: ${err}`);
            throw err;
        });

    return res.rows[0];
}

// UPDATE USER
const updateUser = async (id, phone_number, serveries, allergens, diets) => {
    const res = await pool.query(`
        UPDATE users
        SET phone_number=$1, serveries=$2, allergens=$3, diets=$4
        WHERE id=$5
        RETURNING *
    `, [phone_number, serveries, allergens, diets, id])
        .catch((err) => {
            console.error(`Error updating user: ${err}`);
            throw err;
        })

    return res.rows[0]
}


// DELETE USER
const deleteUser = async (id) => {
    const res = await pool.query(`
    DELETE FROM users 
    WHERE id=$1
    RETURNING *
    `, [id])
        .catch((err) => {
            console.error(`Error deleting user: ${err}`);
            throw err;
        });

    return res.rows[0];
};

module.exports = { insertUser, fetchAllUsers, fetchUserById, fetchUserByPhone, updateUser, deleteUser };



/*
const createUsersQuery = `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    phone_number TEXT,
    serveries TEXT[],
    allergens TEXT[],
    diets TEXT[],
)`;
*/