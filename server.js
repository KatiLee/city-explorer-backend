'use strict';

const express = require ('express');
require ('dotenv').config();
// let data = require();
const cors = require('cors');
const { response } = require('express');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;

app.get('/', (request, response) => {
    response.send('this is the server home route / !');
});


// const Weather = require('');
// const Movies = require('');
// const Yelp = require('');

// app.get('/weather', Weather.weatherRequest);
// app.get('/movie', Movie.movieRequest);
// app.get('/yelp', Yelp.yelpRequest);

app.get('*', (request, response) => {
    response.status(404).send('No route was found, error 404.');
});

app.use((error, request, response) => {
    response.status(500).send(error.message);
});


app.listen(PORT, () => console.log (`listening on port ${PORT}`));