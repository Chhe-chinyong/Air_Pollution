const express = require("express");
const Logger = require("@ptkdev/logger");
const options = require("./object");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const chalk = require('chalk');
const dotenv = require("dotenv"); 
const app = express();
const path = require('path');
const hbs = require('hbs');
//Define path
const templatePath = path.join(__dirname, "/templates/views");
const publicPath = path.join(__dirname, '/public');
const partialPath = path.join(__dirname, "/templates/partials");


//Set-up handlebar engine 
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));
hbs.registerPartials(partialPath);
app.use(bodyParser.urlencoded({ extended: true }));

//config
dotenv.config();


//Variable 
const logger = new Logger(options.option1);
const PORT = process.env.PORT || 3000;



//Routes
app.use("/", require("./routes/search"));




//Listening PORT 3000
app.listen(PORT, () => {
    console.log(chalk.blueBright.inverse("http://localhost:3000/"));
})
