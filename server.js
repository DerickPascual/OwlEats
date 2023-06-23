require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const errorHandler = require('./middleware/errorHandler');
const port = 3500;

if (process.env.NODE_ENV === 'development') {
    app.set("trust proxy", 1); 
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')));
}

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: ['https://localhost:3000'],
        credentials: true
    }));
}

app.use(session({
    store: new (require('connect-pg-simple')(session))({
        conString: process.env.DATABASE_URL,
        tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET_KEY,
    proxy: process.env.NODE_ENV === 'development',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use('/api/session', require('./routes/sessionRoutes'));

app.use('/api/login', require('./routes/loginRoutes'));

app.use('/api/register', require('./routes/registerRoutes'));

app.use('/api/verify', require('./routes/verifyRoutes'));

app.use('/api/users', require('./routes/userRoutes'));

app.all('*', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    }
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});