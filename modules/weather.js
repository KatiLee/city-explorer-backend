'use strict';

const { response } = require('express');

const axios = require('axios').default;
const weatherKey = process.env.WEATHER_API_KEY;
let cache = {};
let cacheTime = 1000 * 60 * 60 * 24;

class Weather {
    constructor(weatherObject) {
        this.dateTime = [];
        this.description = [];
        this.lowTemp = [];
        this.maxTemp = [];
        for (let i = 0; i < weatherObject.data.data.length; i++) {
            this.cityName = weatherObject.data.data.city_name;
            this.dateTime[i] = weatherObject.data.data[i].dateTime;
            this.description[i] = weatherObject.data.data[i].weather.description;
            this.lowTemp[i] = weatherObject.data.data[i].low_temp;
            this.maxTemp[i] = weatherObject.data.data[i].max_temp;
        }
    }
}

Weather.reqWeather = async (req, res) => {
    try {
        let cityLat = req.query.lat;
        let cityLon = req.query.lon;
        let cityName = req.query.cityname.toLowerCase();
        let returnArray = [];

        let key = cityName + '-Data';

        if(cache[key] && (Date.now() - cache[key].timeStamp) < cacheTime) {
            returnArray = cache[key].data;
        }
    else{
        let getWeatherApi = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily`,
        {params:
        {key: weatherKey,
        lat: cityLat,
        lon: cityLon,
            } 
        }
        );
    if (getWeatherApi === undefined) {
        res.status(500).send('Oh no! We couldn\'t find the city you are looking for.');
    }
    else{
        let weatherToSend = new Weather(getWeatherApi);
        for (let i = 0; i <weatherToSend.dateTime.length; i++) {
            returnArray.push({'date': weatherToSend.dateTime[i], 'description': `The Low will be ${weatherToSend.lowTemp[i]}, with a high of ${weatherToSend.maxTemp[i]} and ${weatherToSend.description[i]}`});
        }
        cache[key] = {
            data: returnArray,
            timeStamp: Date.now()
        };
    }
 }
 response.status(200).send(returnArray);
} catch (error) {
    response.status(500).send(error.message);
    }
};

module.exports = Weather;