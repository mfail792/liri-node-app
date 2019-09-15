require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


var userEntry = process.argv[2];
var passIN = process.argv[3];




