const express = require("express");
const Logger = require("@ptkdev/logger");
const options = require("./object");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const chalk = require('chalk');
const dotenv = require("dotenv"); 
const app = express();


// app.use(express.static());


//config
dotenv.config();


//Variable 
const logger = new Logger(options.option1);
const PORT = process.env.PORT || 3000;



//Routes
app.use("/", require("./routes/search"));

app.listen(PORT, () => {
    console.log(chalk.blueBright.inverse("http://localhost:3000/"));
})
