const express = require("express");
const PUT = require("./POST");
const GET = require("./GET");
const app = express();

app.use(PUT,GET);