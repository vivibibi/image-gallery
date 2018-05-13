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
const displayGal = require('./displayGal.js');
const displayFav = require('./displayFav.js');
const checkPassword = require('./checkPassword.js');



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

app.post('/', (req, res) => {

    checkPassword.checkPassword(res.req.body.uname, res.req.body.pswd, (result) => {
        if (result === true) {
            global.session_user = res.req.body.uname
        }

        res.render('search.hbs', {
            title: 'Home Page',
            username: session_user

        });
    })

});

/**
 * Routes the /results path
 */
app.get('/results', (request, response) => {
    /**
     * Grabs the query from the GET response
     */
    nquery = response.req.query.query;

    /** 
     * get picture links from the query
     */
    getThumbs.getThumbnails(nquery, (errorMessage, results) => {
        global.galThumbs = results;
        global.searchedpics = displayRe.displayResults(errorMessage, results);

        /** 
         * the HTML code is sent to be displayed
         */
        response.send(searchedpics);
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

    displayGal.displayGal(session_user, (result) => {
        response.send(result);
    });


    /** 
     * the HTML code is sent to be displayed
     */


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

    displayFav.displayFav(session_user, (result) => {

        /** 
     * the HTML code is sent to be displayed

     */
        response.send(result);
    });

});

//saving/pushing favorite pictures//


/** 
 * push the server up on the port
 */
app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);

});