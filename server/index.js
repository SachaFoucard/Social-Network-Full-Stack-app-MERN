//express is imported to create the server.
const express = require('express')
const app = express();

require('dotenv').config()

//cors is imported and used as middleware to allow cross-origin requests.
const cors = require('cors');

//import the function mangodb from config/database
const mangodb = require('./config/database')

//function to connect database (Mango db)
mangodb()

const PORT = process.env.PORT || 7000

//security 
app.use(cors())

//to use json format
app.use(express.json())

require("dotenv").config({
    path: './.env'
});

require("./config/database");

app.use("/api", require('./routes/productRoute'))


try {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
} catch (error) {
    console.log(error);
}