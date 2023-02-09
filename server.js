'use strict';

const express = require ('express');
require ('dotenv').config();
// let data = require();
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;

// const Weather = require('');
// const Movies = require('');
// const Yelp = require('');

app.listen(PORT, () => console.log (`listening on port ${PORT}`));