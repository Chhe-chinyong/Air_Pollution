const dotenv = require("dotenv");
const express = require("express");
const object = require("../object");
const router = express.Router();
const hbs = require('handlebars');
const path = require('path');
const app = express();
const request = require('request');



const {geocoding, air} = object;


router.get('/', (req,res) => {
    // res.send('hello')
    res.render('index');
})




router.get('/weather', (req,res) => {
    const key = process.env.API_AIR;
    const url = `https://api.airvisual.com/v2/nearest_city?key=${key}`;
    request(url, (error, response, body) => {
        
        //parse
        const json = JSON.parse(body);

        if (error)
        {
            console.log("internet")
            return callback("Unable to connect to service", undefined);  
        }

        else if(json.data.message == 'wrong_coordinates')
        {
            callback("Unable to find location", undefined);
        }
         
        else
        {
            res.send({
                    city:json.data.city,
                    state:json.data.state,
                    country:json.data.country,
                    time:json.data.current.weather.ts,
                    temp:json.data.current.weather.tp,
                    humid:json.data.current.weather.hu, //%
                    wind:json.data.current.weather.ws, //m/s
                    ic:json.data.current.weather.ic, //icon
                    time_pollution: json.data.current.pollution.ts,
                    air: json.data.current.pollution.aqius
                })
        }
        
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