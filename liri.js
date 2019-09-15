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

    var queryURL = "https://rest.bandsintown.com/artists/" + movieID + "/events?app_id=codecademy";

    request(queryURL, function (error, response, body) {

        if (!error & response.statusCode === 200) {

            var JS = JSON.parse(body);
            for (i = 0; i < JS.length; i++) {
                var dTime = JS[i].datetime;
                var month = dTime.substring(5, 7);
                var year = dTime.substring(0, 4);
                var day = dTime.substring(8, 10);
                var dateForm = month + "/" + day + "/" + year;

                logIt("\n---------------------------------------------------\n");

                logIt("Date: " + dateForm);
                logIt("Name: " + JS[i].venue.name);
                logIt("City: " + JS[i].venue.city);
                if (JS[i].venue.region !== "") {
                    logIt("Country: " + JS[i].venue.region);
                }
                logIt("Country: " + JS[i].venue.country);
                logIt("\n---------------------------------------------------\n");

            }
        }
    });
}


function theSong(passIN) {


    var searchSong;
    if (passIN === undefined) {
        searchSong = "The Sign ace of base";
    } else {
        searchSong = passIN;
    }
    spotify.search({
        type: 'track',
        query: searchSong
    }, function (error, data) {
        if (error) {
            logIt('Error occurred: ' + error);
            return;
        } else {
            logIt("\n---------------------------------------------------\n");
            logIt("Artist: " + data.tracks.items[0].artists[0].name);
            logIt("Song: " + data.tracks.items[0].name);
            logIt("Preview: " + data.tracks.items[3].preview_url);
            logIt("Album: " + data.tracks.items[0].album.name);
            logIt("\n---------------------------------------------------\n");

        }
    });
};

function filmData(passIN) {


    var locateMovie;
    if (passIN === undefined) {
        locateMovie = "Mr. Nobody";
    } else {
        locateMovie = passIN;
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + locateMovie + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (err, res, body) {
        var bodyOf = JSON.parse(body);
        if (!err && res.statusCode === 200) {
            logIt("\n---------------------------------------------------\n");
            logIt("Title: " + bodyOf.Title);
            logIt("Release Year: " + bodyOf.Year);
            logIt("IMDB Rating: " + bodyOf.imdbRating);
            logIt("Rotten Tomatoes Rating: " + bodyOf.Ratings[1].Value);
            logIt("Country: " + bodyOf.Country);
            logIt("Language: " + bodyOf.Language);
            logIt("Plot: " + bodyOf.Plot);
            logIt("Actors: " + bodyOf.Actors);
            logIt("\n---------------------------------------------------\n");
        }
    });
};