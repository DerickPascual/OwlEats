require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const port = 3500;

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});