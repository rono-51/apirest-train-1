//Require Modules
const mongoose = require('mongoose');

//Function Conection my database
const connectDb = () => {
    try {
        mongoose.connect(process.env.DATABASE_URI)
        console.log('Database is connect')
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDb;