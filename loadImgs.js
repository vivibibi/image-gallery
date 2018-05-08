const fs = require('fs');

/** 
 * inserts all the favorited images into HTML code
 */


module.exports.loadImgs = function() {

    var readimgs = fs.readFileSync('imgs.json');
    var favlist = JSON.parse(readimgs);
    var fav_val = '';

    for (var i = 0; i < favlist.length; i++) {
        fav_val += '<img src=' + favlist[i] + ' <br>';
    };

    return fav_val


}