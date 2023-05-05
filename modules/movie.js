'use strict'

const movieKey = process.env.MOVIE_API_KEY;
const axios = require('axios').default;
let movieCache = {};
let cacheTime = 1000 * 60 * 60 * 24;

class Movie {
    constructor(movieObject) {
        this.title = [];
        this.overview = [];
        for (let i = 0; i < movieObject.data.results.length; i++) {
            this.title[i] = movieObject.data.results[i].title;
            this.overview[i] = movieObject.data.results[i].overview;
        }
    }
}
Movie.movieReq = async (req, res) => {
    try {
    let cityName = req.query.cityname.toLowerCase();
    let returnObject = [];
    let key = cityName + '-Data';

    if(movieCache[key] && ( Date.now() - movieCache[ket].timeStamp) < cacheTime) {
        returnObject = movieCache[key].data;
    }
        else {
        let getMovieApi = await axios.get(`https://api.themoviedb.org/3/search/movie`,
        {params: {
            api_key: movieKey,
            query: cityName,
        }}
        );
    if (getMovieApi === undefined) {
            res.status(500).send('Oh no! We couldn\'t find the city you are looking for.');
        }
        else {
            let dataToSend = new Movie(getMovieApi); 
            for (let i = 0; i < dataToSend.title.length; i++) {
               returnObject.push(
                {'title': `${dataToSend.title[i]}`,
                 'overview': `${dataToSend.overview[i]}`
            }
               ); 
            }
            movieCache[key] = {
                data: returnObject,
                timeStamp: Date.now()
            };
        }
    }
    res.status(200).send(returnObject);
} catch (error) {
    res.status(500).send(error.message);
}
};

module.exports = Movie;