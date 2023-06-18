require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');
const inputValidator = require('./middleware/inputValidator');
const port = 3500;

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use(session({
    store: new (require('connect-pg-simple')(session))({
        conString: process.env.DATABASE_URL,
    }),
    secret: process.env.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

app.use('/login', require('./routes/loginRoutes'));

app.use('/register', require('./routes/registerRoutes'));

app.use('/verify', require('./routes/verifyRoutes'));

app.use('/users', inputValidator, auth, require('./routes/userRoutes'));

app.all('*', (req, res) => {
    console.log(req.session);
    res.status(404).json({ error: { message: 'Resource not found' } }); 
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});