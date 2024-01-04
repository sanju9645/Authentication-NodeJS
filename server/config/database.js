require('dotenv').config();
const mongoose = require('mongoose');

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * MONGODB_URI=mongodb+srv://{username}:{password}@cluster0.lo3cgvx.mongodb.net/{database}
 */
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    let conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Database Connection Error " + error);
  }
}

module.exports = connectDB;