import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import axios from "axios";
import chalk from "chalk";
import cheerio from "cheerio";

// setup some consts
const PORT = process.env.PORT || 8080;
const WEB_PAGE = `https://www.captainu.com`;

// create the app
var app = express();

// express utils
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

/* 
    middleware for all routes, makes an async request
    to get a webpage and waits for the result to set
    on the request. This could be a db call, or other
    async API as well 
*/
app.use(async (request, response, next) => {
  const result = await axios.get(WEB_PAGE);
  const $ = cheerio.load(result.data);

  /* 
    pageTitle will be available to all routes
    via the request obj. This could be results from
    a login or something session specific. 
  */

  /* 
    ideally this would be cached in a session instead of lookup
    on every route call. 
  */
  request.pageTitle = $("title").text();
  next();
});

// use the info in a route
app.get("/", (request, response) => {
  response.status(200).json({ result: "success", code: 200, data: { title: request.pageTitle } });
});

// fire up the server
app.server = app.listen(PORT, () => console.log(chalk.blue(`asyncExpress running on port ${PORT}`)));

module.exports = app;
