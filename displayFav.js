const request = require('request');
const fs = require('fs');


/** 
   * if there's no favorite images returned, an error message will be displayed
   */

module.exports.displayFav = function() {
	var disfav = '';
	try {
    var readimgs = fs.readFileSync('imgs.json');
    var favlist = JSON.parse(readimgs);
    var fav_val = '';

    for (var i=0; i<favlist.length; i++){
       fav_val += '<img src=' + favlist[i] + ' <br>';
    };

    var fav = fs.readFileSync('favorite.json');
    var favP = JSON.parse(fav);
    var favPage = favP.fav1;

    disfav += favPage + fav_val;

    } catch (SyntaxError) {
      disfav += '<font size="6"><b>No favorite images<b></font>';
    }
    return disfav
};