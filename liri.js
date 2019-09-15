require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


var userEntry = process.argv[2];
var passIN = process.argv[3];


function switchEffort() {

    switch (userEntry) {

        case 'concert-this':
            concertIt(passIN);
            break;

        case 'spotify-this-song':
            theSong(passIN);
            break;

        case 'movie-this':
            filmData(passIN);
            break;

        case 'do-what-it-says':
            doWhat();
            break;

        default:
            logIt("Invalid Instruction");
            break;

    }
};

//creating concertIt function
function concertIt(passIN) {

    if (userEntry === 'concert-this') {
        var movieID = "";
        for (var i = 3; i < process.argv.length; i++) {
            movieID += process.argv[i];
        }
        console.log(movieName);
    }
    else {
        movieID = passIN;
    }

