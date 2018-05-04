// SoViDe

const express = require('express');
const request = require('request');
const getThumbs = require('./getThumbnails.js');
const favPic = require('./favPic.js');
const fs = require('fs');
const addAlbum = require('./addAlbum.js');

const hbs = require('hbs');
var thumbs = [],
    nquery = '';
const port = process.env.PORT || 8080;

var app = express();

var album = {
    title: 'title',
    imgs: 'imgs',
};

//album//


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


// show the search box
app.get('/', (request, response) => {
    response.render('search.hbs')
});


// show the result of the search
app.get('/results', (request, response) => {
    nquery = response.req.query.query;
    // get picture links from the query
    getThumbs.getThumbnails(nquery, (errorMessage, results) => {

        if (results == undefined) {
            console.log(errorMessage);
            response.send('<h1>' + errorMessage + '</h1>');
        } else {
            global.formatThumbs = '<br>';
            global.listofimgs = [];
            global.galThumbs = '<br>';

            for (i = 0; i < results.length; i++) {
               listofimgs.push(results[i]);
               //console.log(results[i]);
               galThumbs += '<img class=thumbnails src=' + results[i] + '>';
               formatThumbs += '<img class=thumbnails src=' + results[i] + '><form id=favForm method=GET action=/favorite>'+
               '<button name=favorite id=favorite value=' + i + '' + ' type=submit>❤</button></form>';
            }

            var readresults = fs.readFileSync('results.json');
            var total = JSON.parse(readresults);
            var part1 = total.part1;
            var part2 = total.part2;

              // display the thumbnails on the website

            response.send(part1 + part2 + formatThumbs);
          }
    });
});


//gallery page//
app.get('/gallery', (request, response) => {

  if (request.query.title != undefined){
    addAlbum.addAlbum(request.query.title, galThumbs);
  }
    try {
      var readalbum = fs.readFileSync('album.json');
      var piclist = JSON.parse(readalbum);
      var gallery_val = '';
      for (var i=0; i<piclist.length; i++){
          gallery_val += '<div id=galDiv <br> <b>' + piclist[i].title +'</b><br><div id=galDivPic <img src='+ piclist[i].imgs + ' </div> </div>';
      }

      var readgallery = fs.readFileSync('gallery.json');
      var galPage = JSON.parse(readgallery);
      var galPage1 = galPage.gal1;

      response.send(galPage1 + gallery_val);

    } catch (SyntaxError) {
      response.send('<font size="6"><b>No albums<b></font>');
    }
});


//favorite page//
app.get('/favorite', (request, response) => {

  if (request.query.favorite != undefined){
    favPic.favPic(listofimgs[request.query.favorite]);
     console.log(listofimgs[request.query.favorite]);
  } try {
    var readimgs = fs.readFileSync('imgs.json');
    var favlist = JSON.parse(readimgs);
    var fav_val = '';

    for (var i=0; i<favlist.length; i++){
       fav_val += '<img src=' + favlist[i] + ' <br>';
    };

    var fav = fs.readFileSync('favorite.json');
    var favP = JSON.parse(fav);
    var favPage = favP.fav1;

    response.send(favPage + fav_val);

    } catch (SyntaxError) {
      response.send('<font size="6"><b>No favorite images<b></font>');
    }
});

//saving/pushing favorite pictures//



app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);

});