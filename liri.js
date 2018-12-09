require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
})
var fs = require("fs")

// Switch Statement to determine user request:
var command = process.argv[2];
var request = process.argv.slice(3).join(" ");

function search() {
    switch(command) {
        case "concert-this":
        findConcert();
        break;

        case "spotify-this-song":
        findSong();
        break;

        case "movie-this":
        findMovie();
        break;
    }
}

// Bands In Town Function:
function findConcert() {
    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp")
    .then(function(response) {
        var jsonData = response.data[0];
        var showConcert = [
            "Venue Name: " + jsonData.venue.name,
            "Venue Location: " + jsonData.venue.city,
            "Date of Event: " + moment(jsonData.datetime).format('MM/DD/YYYY'),
        ].join("\n");
        console.log(showConcert)
    }
)}

// OMDB Function:
function findMovie() {
    if (request === "") {
        request = "Mr. Nobody"
    }
    console.log(request)
    axios.get("http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
        var jsonData = response.data;
        var showMovie = [
            "Title: " + jsonData.Title,
            "Year: " + jsonData.Year,
            "IMDB Rating: " + jsonData.Ratings[0].Value,
            "IMDB Rating: " + jsonData.Ratings[1].Value,
            "Country: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Actors: " + jsonData.Actors,
        ].join("\n");
        console.log(showMovie)
    }
)}

search()