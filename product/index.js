const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { dbConnection } = require("./config/db");
dbConnection();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middlewares/error-handler.middleware");
const Consumer = require("./workers/consumer");
const {consumeMessage} =new Consumer;
const app = express();


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // extended  true is for nested data
app.use(express.urlencoded({ extended: true })); //for file data

consumeMessage()
app.use("/", require("./routes"));
app.use(errorHandler);



const APP_PORT = process.env.APP_PORT || 8080;

app.listen(APP_PORT, () => {
  console.log("server started", APP_PORT);
});
