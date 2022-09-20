require('dotenv').config()
const express = require("express");
const db = require('./db')

const app = express();
const { AuthRouter } = require('./routes');

db.connect();

app.use(express.json());
app.use('/api/auth', AuthRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    };
    console.log(`Listening on port ${PORT}...`);
});

