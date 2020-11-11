const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const indexRouter = require("@routers");
const apiRouter = require("@routers/api");

const { handleNotFoundPage, handleError } = require("@middlewares/error");
const { logs } = require("@configs/constants");

const FRONTEND_BUILD_PATH = path.join(__dirname, "../../frontend/build");

const app = express();

app.use(express.static(FRONTEND_BUILD_PATH));

app.use(morgan(logs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors(
    { credentials: true, origin: "http://localhost:3000" },
    { credentials: true, origin: "https://ecommerce-v1.vercel.app/" }
  )
);

//Router
app.use("/", indexRouter);
app.use("/api/", apiRouter);

app.use(handleNotFoundPage);
app.use(handleError);

module.exports = app;
