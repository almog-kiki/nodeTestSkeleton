const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv =require("dotenv");
const app = express();
const user = require('./routes/user.route');

dotenv.config();

const mongodbUrl = process.env.MONGODB_URL + process.env.MONGODB_NAME
const mongoDB = mongodbUrl || 'mongodb://127.0.0.1/DB_NAME';
mongoose.connect(mongoDB, { useNewUrlParser: true , useCreateIndex: true,useFindAndModify: false,useUnifiedTopology: true});
let db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', user);

const port = process.env.PORT || 8009;
app.listen(port);
console.log("Server listening at http://%s:%s", "localhost", port);

module.exports = app;
