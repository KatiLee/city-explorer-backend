'use strict';
console.log('sup nerds?')

const express = require ('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());

// let data = require('./data/weather.json');

const Weather = require('./modules/weather');
const Movie = require('./modules/movie');
// const Yelp = require('./modules/yelp');

const PORT = process.env.PORT || 5005;

app.get('/', (req, res) => response.send('this is the server')
);

app.get('/weather', Weather.weatherReq);
app.get('/movie', Movie.movieReq);
// app.get('/yelp', Yelp.yelpReq);

app.get('*', (req, res) => response.status(404).send('No route was found, error 404.')
);

app.use((error, req, res) => response.status(500).send(error.message)
);

app.listen(PORT, () => console.log (`listening on port ${PORT}`));