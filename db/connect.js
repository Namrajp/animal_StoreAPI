const mongoose = require('mongoose')


const connectDB = (url) => {
  return mongoose.connect(url)
  .then(client => {
    console.log("Connected to db successfully.");
    return client;
  }).catch(err => {
    console.error("Database connection failed:", err);
    throw err;
  });   
}

module.exports = connectDB
