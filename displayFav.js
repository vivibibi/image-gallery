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

        var imgs = loadImgs.loadImgs();
        console.log(fav_val);
        var fav = fs.readFileSync('favorite.json');
        var favP = JSON.parse(fav);
        var favPage = favP.fav1;

        disfav += favPage + imgs;

    } catch (SyntaxError) {
        disfav += '<font size="6"><b>No favorite images<b></font>';
    }
    return disfav
};