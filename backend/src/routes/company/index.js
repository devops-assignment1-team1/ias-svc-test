const express = require("express");
const POST = require("./POST");
const GET = require("./GET");
const app = express();

app.use(POST,GET);