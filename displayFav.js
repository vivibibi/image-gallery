const request = require('request');
const fs = require('fs');
const loadImgs = require('./loadImgs.js');


/** 
 * loads the favorited images into the favorites page
 * if there's no favorite images returned, an error message will be displayed
 */



module.exports.displayFav = function(user) {


    global.disfav = '';
    global.favo_val = loadImgs.loadImgs(user);
    setTimeout(function() {
        var readfav = fs.readFileSync('favorite.json');
        var favP = JSON.parse(readfav);
        var favPage = favP.fav1;

        disfav += favPage + favo_val;
        return disfav
    }, 4000);






};