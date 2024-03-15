const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const userRoute = require('./routes/userRouter')
const goalRoute = require('./routes/goalRouter')
require("dotenv").config();



connectDB();

const app = express()


app.use(cors());
app.use(express.json());



app.use('/api/users', userRoute);
app.use('/api/goals', goalRoute);


module.exports = app;