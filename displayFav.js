const request = require('request');
const fs = require('fs');
const loadImgs = require('./loadImgs.js');


/** 
 * loads the favorited images into the favorites page
 * if there's no favorite images returned, an error message will be displayed
 */



module.exports.displayFav = function(user, callback) {


    global.disfav = '';
    loadImgs.loadImgs(user, (result) => {
    	var readfav = fs.readFileSync('favorite.json');
        var favP = JSON.parse(readfav);
        var favPage = favP.fav1;

        disfav += favPage + favo_val;
        callback(disfav)
    });
    

};