/** 
 * Express is used to start a webserver
 */
const express = require('express');
/** 
 * Handlebars is used to insert dynamic data (e.g. new albums)
 */
const hbs = require('hbs');
/** 
 * Body-parser gets POST parameters
 */
const bodyParser = require('body-parser');
/** 
 * Mongodb function used to connect to the database
 */
const MongoClient = require('mongodb').MongoClient;

/** 
 * Submits an album to the database
 */
const addAlbum = require('./addAlbum.js');
/** 
 * Retrieves thumbnails from a search query
 */
const getThumbs = require('./getThumbnails.js');
/** 
 * Saves a single image when you click on the favorite button to the database
 */
const favPic = require('./favPic.js');
/** 
 * loads all the user's albums from the database
 */
const loadGal = require('./loadGal.js');
/** 
 * Checks to see if the entered password matches the one from the database
 */
const checkPassword = require('./checkPassword.js');
/** 
 * loads all the user's favorites from the database
 */
const loadImgs = require('./loadImgs.js');
/** 
 * File with credentials needed to access the database
 */
const dbCred = require("./databaseCred.js");

/** 
 * Calls an express function so that we can use GET and POST
 */
var app = express();
/** 
 * Server runs on port 8080
 */
const port = process.env.PORT || 8080;


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

global.session_user = 'Guest'
/** 
 * When a search result is sent, the query is stored here
 */
var nquery = '';


/**
 * Routes the / (root) path
 */

app.get('/', (request, response) => {
    /**
     * Displays the home page depending on the user (default is guest)
     */
    response.render('search.hbs', {
        title: 'Home Page',
        username: session_user

    });
});

/**
 * Completes a post request whenever a user signs in
 */
app.post('/', (req, res) => {
    /**
     * Connects to the user collection and retrieves the password from the database and verifies that the passwords match
     */
    MongoClient.connect(dbCred.uri, function(err, client) {
        const users = client.db("Users").collection("Users");
        users.find({
            username: res.req.body.uname
        }).forEach(function(error, doc) {
            if (checkPassword.checkPassword(error.password, res.req.body.pswd) === true) {
                global.session_user = res.req.body.uname
            }

        });
        client.close();

    });

    /**
     * Renders a new homepage with the updated user
     */
    setTimeout(function() {
        res.render('search.hbs', {
            title: 'Home Page',
            username: session_user

        });
    }, 2000);

});


/**
 * Routes the /results path
 */
app.get('/results', (request, response) => {
    /** 
     * get picture links from the query
     */
    getThumbs.getThumbnails(response.req.query.query, (errorMessage, results) => {
        global.formatThumbs = '<br>';
        /** 
         * the URLs will be encapsulated in HTML code and returned
         */
        if (results) {
            global.listofimgs = [];
            global.galThumbs = '<br>';
            for (i = 0; i < results.length; i++) {
                listofimgs.push(results[i]);
                galThumbs += '<img class=thumbnails id=pic' + i + '  src=' + results[i] + '>';
                formatThumbs += '<img class=thumbnails id=pic' + i + '  src=' + results[i] + '><form id=favForm method=GET action=/favorite>' +
                    '<button name=favorite id=favorite value=' + i + ' type=submit>❤</button></form>';
            }

        } else {
            /** 
             * if there's no pictures returned, an error message will be displayed
             */
            formatThumbs += '<h1>' + errorMessage + '</h1>';

        }
        /** 
         * the HTML code is sent to be displayed
         */
        setTimeout(function() {
            response.render('results.hbs', {
                title: 'Results',
                pictures: formatThumbs

            });
        }, 2000);


    });

});

/** 
 * Routes the /gallery path
 */
app.get('/gallery', (request, response) => {
    /** 
     * if user enters title and clicks the "save" button, an album will be added to gallery
     */
    if (request.query.title != undefined) {
        addAlbum.addAlbum(request.query.title, galThumbs, session_user);
    }
    /** 
     * albums are retrieved based on the user that is signed in
     */
    loadGal.loadGal(session_user, (result) => {
      
            response.render('gallery.hbs', {
                title: 'Gallery',
                album: result

            });
        

    });






});


/** 
 * Routes the /favorite path
 */
app.get('/favorite', (request, response) => {
    /**
     * if user clicks the "favorite" button, the image will be added to favorite
     */
    if (request.query.favorite != undefined) {
        favPic.favPic(listofimgs[request.query.favorite], session_user);
    }
    loadImgs.loadImgs(session_user, (result) => {
        response.render('favorite.hbs', {
            username: session_user,
            favorites: result
        });
    });



});



/** 
 * push the server up on the port
 */
app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);

});