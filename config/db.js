const mongoose = require('mongoose')

const connection = mongoose.connect
("mongodb+srv://abhijeetme:admin@cluster0.dzal4.mongodb.net/").then(() => {
    console.log("Connected");
})

module.exports = connection;