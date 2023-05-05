'use strict';
console.log('sup nerds?')

const express = require ('express');
require ('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;

app.get('/', (req, res) => {
    response.send('this is the server');
});

app.get('/weather', async (req, res, next) => {

    try {
      let searchQuery = request.query.searchQuery;
      let weatherDataObject = data.find(ele => ele.city_name.toLocaleLowerCase() === searchQuery.toLocaleLowerCase());
      let dataTosend = weatherDataObject.data.map(forecast => new Forecast(forecast));
      console.log(dataTosend, 'datatosend');
      response.status(200).send(dataTosend);
    } catch (error) {
      next (error);
    }
  });

app.get('*', (req, res) => {
    response.status(404).send('No route was found, error 404.');
});

app.use((error, req, res) => {
    response.status(500).send(error.message);
});

class Forecast{
    constructor(forecastObject) {
      this.date = forecastObject.datetime;
      this.description = forecastObject.weather.description;
    }
  }

app.listen(PORT, () => console.log (`listening on port ${PORT}`));

// const Weather = require('');
// const Movies = require('');
// const Yelp = require('');

// app.get('/movie', Movie.movieRequest);
// app.get('/yelp', Yelp.yelpRequest);