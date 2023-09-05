require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const router = require("./Routes/router");


const connectDB = require('./config/db-setup.js')
const cookieParser = require('cookie-parser')
connectDB()


app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("./uploads"));
app.use("/files",express.static("./public/files"));

 app.get('/', (req, res) => {
     res.json({ App: 'Welcome to the Server!!' })
          })
  

app.use(router);

module.exports = app