require("dotenv").config();

//linking key page
var keys = require("./keys.js");

//require request
var request = require("request");

//require file system
var fs = require("fs");

//require moment
var moment = require('moment');

//to initialize spotify
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//OMDB and banks in town API's
var ombd = (keys.omdb);
var bandsintown = (keys.banksintown);

// // takes user command and input
var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");

//settig cases to occur with methods inside based on user input
function userCommand(userInput, userQuery) {
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis(userQuery);
            break;
        default:
            console.log("I don't understand");
            break;

    }
}


userCommand(userInput, userQuery);


function concertThis() {
