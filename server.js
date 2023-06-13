require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const port = 3500;

app.use('/', require('./routes/index'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});