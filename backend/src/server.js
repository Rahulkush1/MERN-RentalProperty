import {app } from './app.js';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';

dotenv.config({
    path: './.env'
})


connectDB()
.then(() => [
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
])
.catch((err) => console.log("MongoDB connection failed !!!",err))

