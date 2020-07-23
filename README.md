# liri-node-app

This CLI node application is designed to provide the user with the ability to search databases for relevant information based on their query.  

Through simple commands, the user is able to draw relevant data on their favorite artists, such as song information or even when they will be performing next and where.  The application also allows users to type in their favorite films (or films they are considering watching) and receive important feedback on them.

The information dispayed to the console is pulled from varying npm packages - including Node Spotify, Bands In Town, Moment, DotEnv and OMDB.  The application relies heaviliy on Javascript and axios calls to retrieve data.


The following commands can be entered into the console:

node liri.js concert-this 'input artist here'

node liri.js spotify-this-song 'input song here'

node liri.js movie-this 'input movie here'  *Upon no input, Mr. Nobody information will appear along with a link*

node liri.js do-what-it-says


Video Overview:  https://drive.google.com/file/d/1yFCkxlJ8q9AxaRCKJ5JIk3qhMM1DHG_8/view


