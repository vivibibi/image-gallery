const fs = require('fs');

module.exports.loadGal = function() {
    try {
        var readalbum = fs.readFileSync('album.json');
        var piclist = JSON.parse(readalbum);
        var gallery_val = '';
        for (var i = 0; i < piclist.length; i++) {
            gallery_val += '<div id=galDiv <br> <b>' + piclist[i].title + '</b><br><div id=galDivPic <img id=galDivPic src=' + piclist[i].imgs + ' </div> </div>';
        }
    } catch (SyntaxError) {
        gallery_val += '<font size="6"><b>No albums<b></font>';
    }
    return gallery_val
}