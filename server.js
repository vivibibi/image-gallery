const express = require('express');
const request = require('request');
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

const addAlbum = require('./addAlbum.js');
const getThumbs = require('./getThumbnails.js');
const favPic = require('./favPic.js');
const displayRe = require('./displayResults.js');
const loadGal = require('./loadGal.js');
const checkPassword = require('./checkPassword.js');
const loadImgs = require('./loadImgs.js');


var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";



var app = express();



hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

global.session_user = 'Guest'
var thumbs = [],
    nquery = '';


/**
 * Routes the / (root) path
 */

app.get('/', (request, response) => {
    /**
     * Displays the main page
     */

    response.render('search.hbs', {
        title: 'Home Page',
        username: session_user

    });
});

/**
 * Posts whenever a user logs in
 */

app.post('/', (req, res) => {
    MongoClient.connect(uri, function(err, client) {
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
        /** 
         * the HTML code is sent to be displayed
         */
        response.render('results.hbs', {
            title: 'Results',
            pictures: displayRe.displayResults(errorMessage, results)

        });

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
     * the HTML code is sent to be displayed
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