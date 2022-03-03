const mongoose = require('mongoose')

//===========================Connection Request ===========================//
const DB = process.env.DATABASE;

//===========================Connection with Database ===========================//
mongoose.connect("mongodb://localhost/Blog")
    .then(() => console.log('Database Connected'))
    .catch(error => console.log(error))