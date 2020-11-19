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
const regexDomain = new RegExp(`/\.vercel\.app$/`, "g");
const allowedDomains = [regexDomain, "https://localhost:3000", process.env.FRONTEND_URL, "https://kinshop.tk"];

const app = express();

app.use(express.static(FRONTEND_BUILD_PATH));

app.use(morgan(logs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    credentials: true,
    origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    exposedHeaders: ["set-cookie"],
  })
);

//Router
app.use("/", indexRouter);
app.use("/api/", apiRouter);

app.use(handleNotFoundPage);
app.use(handleError);

module.exports = app;
