const request = require('request');
const fs = require('fs');
const loadGal = require('./loadGal.js');

/** 
 * combines the page's HTML with HTML of the albums
 */


module.exports.displayGal = function(user) {
    global.disgal = ''

    global.gallery_val = loadGal.loadGal(user);
    setTimeout(function() {

        var readgallery = fs.readFileSync('gallery.json');
        var galPage = JSON.parse(readgallery);
        var galPage1 = galPage.gal1;

        disgal += galPage1 + gallery_val;
        return disgal
    }, 4000);

}