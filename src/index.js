import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import axios from "axios";
import chalk from "chalk";
import cheerio from "cheerio";
import pkg from "../package";

// setup some conts
const PORT = process.env.PORT || 8080;
const WEB_PAGE = `https://www.captainu.com`;

// create the app
var app = express();

// express utils
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// middleware for all routes, makes an async request
// to get a webpage and waits for the result to set
// on the request. This could be a db call, or other
// async API as well
app.use(async (request, response, next) => {
  const result = await axios.get(WEB_PAGE);
  const $ = cheerio.load(result.data);
  request.pageTitle = $("title").text();
  next();
});

// use the info in a route
app.get("/", (request, response) => {
  response.status(200).json({ result: "success", code: 200, data: { title: request.pageTitle } });
});

app.server = app.listen(PORT, () =>
  console.log(chalk.blue(`${pkg.name} version ${pkg.version} running on port ${PORT}`))
);

module.exports = app;
