const express = require("express");
const app = express();
const apiRoute = require("./routes/api");
const loginRoute = require("./routes/api/auth");
const bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
const uploads = require('express-fileupload');
const cors = require("cors");
app.use(cors());


// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data

app.use(uploads({
    useTempFiles : true,
    tempFileDir : '/src/'
}));


app.use("/api",  apiRoute);
app.use("/login",  loginRoute);

app.listen("3000");
