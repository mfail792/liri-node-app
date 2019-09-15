require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');


var spotify = new Spotify(keys.spotify);


var userEntry = process.argv[2];
var passIN = process.argv[3];

//tells program what method to run for each command entered
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


//function for axios call to display artist information to console (name of venue, venue loc and date of event)
function concertIt(artist) {
    if (userEntry === 'concert-this') {
        var artist = "";
        for (var i = 3; i < process.argv.length; i++) {
            artist += process.argv[i];
        }
        console.log(artist);
    }
    else {
        artist = passIN;
    }
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(
        function (response) {
            if (response.data[0].venue != undefined) {
                console.log("Event Veunue: " + response.data[0].venue.name);
                console.log("Event Location: " + response.data[0].venue.city);
                var eventDateTime = moment(response.data[0].datetime);
                console.log("Event Date & Time: " + eventDateTime.format("dddd, MMMM Do YYYY"));
            }
            else {
                console.log("No results found.");
            }
        }
    ).catch(function (error) {
        console.log(error);
    });
}

//spotify function to take user's song request and pull more info on song and offer preview if available
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


//movie function calling out to OMDB to return information from the database
function filmData(movie) {

    //if nothing is entered in search, return Mr. Nobody information
    var movie;
    if (passIN === undefined) {
        movie = "Mr. Nobody";
        console.log('If you have not seen it yet, check it out on Netflix! http://www.imdb.com/title/tt0485947/');
    } else {
        movie = passIN;
    };

    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            //console.log(response.data);
            if (response.data.Title != undefined) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("imdbRating:: " + response.data.imdbRating);
                console.log("Title: " + response.data.Title);
                console.log("Country:: " + response.data.Country);
                console.log("Language:: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("RottenTomatoes: " + response.data.tomatoRating);
            }

        }
        // if response is empty call the api again with the "default" movie 
    ).catch(function (error) {
        console.log(error);
        console.log("No Results found. ");
    });
}

//adding logIt function to append information
function logIt(dataToLog) {

    console.log(dataToLog);

    fs.appendFile('log.txt', dataToLog + '\n', function (err) {

        if (err) return logIt('Error logging data to file: ' + err);
    });
}


//taking info from the random.txt file, placing into an array, splitting it and outputting to console
function doWhat() {
    fs.readFile('random.txt', "utf8", function (error, data) {


        if (error) {
            return logIt(error);
        }

        var dataArr = data.split(",");

        if (dataArr[0] === "spotify-this-song") {
            var songcheck = dataArr[1].trim().slice(1, -1);
            theSong(songcheck);
        }
        else if (dataArr[0] === "concert-this") {
            if (dataArr[1].charAt(1) === "'") {
                var dLength = dataArr[1].length - 1;
                var data = dataArr[1].substring(2, dLength);
                console.log(data);
                concertIt(data);
            }
            else {
                var bandName = dataArr[1].trim();
                console.log(bandName);
                concertIt(bandName);
            }

        }
        else if (dataArr[0] === "movie-this") {
            var movie_name = dataArr[1].trim().slice(1, -1);
            filmData(movie_name);
        }

    });

};


switchEffort();

