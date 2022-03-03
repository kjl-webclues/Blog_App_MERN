const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const app = express()

//===========================CONFIG FILE PATH===========================//
dotenv.config({path : './config.env'})
//===========================DATABASE CONNECTION PATH===========================//
require('./database/connection')

app.use(cookieParser());

//===========================Middleware ===========================//
app.use(express.json());

//===========================Create Route ===========================//
// const blogRouter = require('./Router/blogRoutes');
app.use(require('./Router/blogRoutes'));

//===========================Listing Server ===========================//
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server listining on port ${PORT}`);
})





