require('dotenv').config()
const express = require("express");
const {connect} = require('./config/db')
const app = express();
const PORT = 3000;


connect();
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

