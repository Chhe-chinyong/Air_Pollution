const dotenv = require("dotenv");
const fetch = require('node-fetch');
const request = require('request');

//Config
dotenv.config();

//variable 
const API_MAP = process.env.API_MAP;



const options = {
    "language": "en",
    "colors": true,
    "debug": true,
    "info": true,
    "warning": true,
    "error": true,
    "sponsor": true,
    "write": true,
    "type": "log",
    "path": {
        "debug_log": "./log/debug.log",
        "error_log": "./log/errors.log",
    }
};


//Map 
const geocoding = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${API_MAP}&limit=1`;
    request(url, (error, response, body) => {
      
        if (error)
        {
            console.log("internet")
            return callback("Unable to connect to service", undefined);  
        }
        
        //parse
        const json = JSON.parse(body);


        if (json.features == 0)
        {
            console.log("location")
            callback("Unable to find location", undefined);
        }

       else
       {
            callback(undefined, {
                longitude: json.features[0].center[0],
                latitude: json.features[0].center[1],
                location: json.features[0].place_name
            })   
       }    
    });
}


//AIR

const air = (longitude, latitude, callback) => {
    const url = `https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env.API_AIR}`
    request (url, (error, request, body) => {
        const json = JSON.parse(body);
        if (error)
        {
            callback("Unable to connect to service", undefined);  
        }
       
        else if(json.data.message == 'wrong_coordinates')
        {
            callback("Unable to find location", undefined);
        }
        
        else
        {
            callback(undefined, {
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
            });
        }   
    });
};




//Module_Exports
module.exports.option1 = options;
module.exports.geocoding = geocoding;
module.exports.air = air;