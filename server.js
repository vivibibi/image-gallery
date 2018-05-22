const express = require('express');
const request = require('request');
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

const addAlbum = require('./addAlbum.js');
const getThumbs = require('./getThumbnails.js');
const favPic = require('./favPic.js');

const loadGal = require('./loadGal.js');
const checkPassword = require('./checkPassword.js');
const loadImgs = require('./loadImgs.js');


var MongoClient = require('mongodb').MongoClient;


var app = express();

/** 
 * File with credentials needed to access the database and make API calls
 */
const dbCred = require("./databaseCred.js");

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
     * Displays the home page depending on the user (default is guest)
     */

    response.render('search.hbs', {
        title: 'Home Page',
        username: session_user

    });
});

/**
 * Completes a post request whenever a user signs in or creates an account
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



app.post("/create_account", (req, res) => {
    var us = 0;
    MongoClient.connect(dbCred.uri, function(err, client) {
        const users = client.db("Users").collection("Users");
        users.find({
            username: res.req.body.uname
        }).forEach(function(error, doc) {
            us += 1;

        });
        client.close();
    });

    setTimeout(function() {
        if (res.req.body.pswd == res.req.body.pswd2 && us == 0) {
            MongoClient.connect(dbCred.uri, function(err, client) {
                const users = client.db("Users").collection("Users");
                users.insert({
                    username: res.req.body.uname,
                    password: res.req.body.pswd
                });
                client.close();

            });
            res.render('createacc.hbs', {
                title: 'Account Created!',
                message: 'Congratulations ' + res.req.body.uname + ', you have successfully created an account.'
            });

        } else {

            res.render('createacc.hbs', {
                title: 'Account Creation Unsuccessful',
                message: 'Please try again.'
            });


        }
    }, 3000);

});


/**
 * Routes the /results path
 */
app.get('/results', (request, response) => {
    /** 
     * get picture links from the query
     */
    getThumbs.getThumbnails(response.req.query.query, (errorMessage, results) => {
        global.formatThumbs = '<br><div id="imagesdiv">';
        /** 
         * the URLs will be encapsulated in HTML code and returned
         */
        if (results) {
            global.listofimgs = [];
            global.galThumbs = '<br>';
            for (i = 0; i < results.length; i++) {
                listofimgs.push(results[i]);
                galThumbs += '<img class=thumbnails id=pic'+ i + '  src=' + results[i] + '>';
                formatThumbs += '<img class=thumbnails id=pic'+ i + '  src=' + results[i] + '><form id=favForm method=GET action=/favorite>'+
'<button name=favorite id=favorite value=' + i + ' type=submit>❤</button></form>';
            }
            formatThumbs += "</div>   <div id='greyBack'></div><script type='text/javascript'> var greyBack = document.getElementById('greyBack'), defLeft = null, defRight = null, defTop = null, defBottom = null, defMargin = null, currentDiv = null, bin = document.getElementById('bin'), previousDiv = null; function getID(e) { e = e || window.event; e = e.target || e.srcElement; if (e.className == 'thumbnails') { zoomIn(e); currentDiv = e } else if (e.id == 'greyBack') { zoomOut(currentDiv); } } function zoomIn(element) { defLeft = element.style.left, defRight = element.style.right, defTop = element.style.top, defBottom = element.style.bottom, defMargin = element.style.margin; element.style.position = 'fixed'; element.style.transform = 'scale(5)'; element.style.zIndex = '1'; element.style.left = '0px'; element.style.right = '0px'; element.style.top = '0px'; element.style.bottom = '0px'; element.style.margin = 'auto'; greyBack.style.zIndex = '0'; greyBack.style.opacity = '0.75'; } function zoomOut(element) { element.style.position = 'relative'; element.style.transform = 'scale(1)'; element.style.zIndex = '0'; element.style.left = defLeft; element.style.right = defRight; element.style.top = defTop; element.style.bottom = defBottom; element.style.margin = defMargin; greyBack.style.zIndex = '-1'; greyBack.style.opacity = '0'; } </script></html>"
            
            
            
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

});


/** 
 * push the server up on the port
 */
app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);

});
