require('dotenv').config()
const express = require("express");
const db = require('./db')

const app = express();
const { authRouter, sellerRouter, buyerRouter } = require('./routes');

db.connect();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/buyer', buyerRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    };
    console.log(`Listening on port ${PORT}...`);
});

