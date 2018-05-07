const request = require('request');
const fs = require('fs');
const loadImgs = require('./loadImgs.js');


/** 
 * loads the favorited images into the favorites page
 * if there's no favorite images returned, an error message will be displayed
 */



module.exports.displayFav = function() {
    var disfav = '';
    try {
        fav_val = loadImgs.loadImgs();

        var fav = fs.readFileSync('favorite.json');
        var favP = JSON.parse(fav);
        var favPage = favP.fav1;

        disfav += favPage + fav_val;

    } catch (SyntaxError) {
        disfav += '<font size="6"><b>No favorite images<b></font>';
    }
    return disfav
};