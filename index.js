const express = require("express");
const app = express();
const homeRouter = require("./router/homeRouter");
const redis = require("redis");
const dbConnection = require("./connection");
const User = require("./modal/userSchema");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const multer = require("multer");



// service
require("./config/cache");

const PORT = "8080";

app.use(cors());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })

// for req data
// app.use(express.json());
// app.use(express.urlencoded({extended: false}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(multer({storage:storage}).single('photo'));


// route
app.use("/", homeRouter);

// modal
app.use(User)


app.listen(PORT, () => {
    dbConnection.then((res) => {
        console.log("db is connected..")
        console.log("server is running")
    }).catch((err) => {
        console.log(err.toString());
    })
    // console.log(dbConnection);

})