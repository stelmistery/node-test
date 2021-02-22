const express = require("express");
const fs = require("fs");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));
