require('dotenv').config()
const express = require("express");
const db = require('./db')
const app = express();
db.connect();


app.use(express.json());

app.use('/api/auth', require('./controllers/auth.controller'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    };
    console.log(`Listening on port ${PORT}...`);
});

