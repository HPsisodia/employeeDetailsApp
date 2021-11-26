const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const helmet = require("helmet");
const cookieParser = require('cookie-parser')

global.appRoot = path.resolve(__dirname);


require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(cookieParser())

app.use(express.static('public'));
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "hbs");

const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const userRoute = require('./routes/user');

app.use("/", authRoute);
app.use("/", dashboardRoute, userRoute);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
  });
