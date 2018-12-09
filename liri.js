require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

// LOGIC
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

function search(command, input) {
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