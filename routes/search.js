const dotenv = require("dotenv");
const express = require("express");
const object = require("../object");
const router = express.Router();
const hbs = require('handlebars');
const path = require('path');
const app = express();



const {geocoding, air} = object;




router.get('/', (req,res) => {
    console.log("from home")
    res.render('index', {
        temp: '13'
    })
})


router.get("/search", (req,res) => {
    const address = req.query.address;
    geocoding(address, (error,data) => {
        if (error)
        {
            return res.status(400).send(error);
        }

        air(data.longitude, data.latitude, (error,data) => {
            if (error)
            {
                return res.status(400).send(error);
            }

            res.render('index', {
                object: data
            })
            // return res.status(200).send(data);

        })
    })
})


module.exports = router;