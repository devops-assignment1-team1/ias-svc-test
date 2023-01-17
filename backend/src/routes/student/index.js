const express = require("express");
const PUT = require("./PUT");
const GET = require("./GET");
const app = express();

app.use(PUT,GET);