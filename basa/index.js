const mongoose = require('mongoose');

//Initiate Mongoose Connection
mongoose
    .connect("mongodb://localhost:27017/parser")
    .then(() => console.log('Mongoose connected to DB'))
    .catch((err) => console.log(err));
