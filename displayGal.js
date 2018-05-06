const request = require('request');
const fs = require('fs');


  /** 
   * if there's no albums returned, an error message will be displayed
   */
module.exports.displayGal = function() {
	var disgal = ''
    try {
      var readalbum = fs.readFileSync('album.json');
      var piclist = JSON.parse(readalbum);
      var gallery_val = '';
      for (var i=0; i<piclist.length; i++){
          gallery_val += '<div id=galDiv <br> <b>' + piclist[i].title +'</b><br><div id=galDivPic <img id=galDivPic src='+ piclist[i].imgs + ' </div> </div>';
      }

      var readgallery = fs.readFileSync('gallery.json');
      var galPage = JSON.parse(readgallery);
      var galPage1 = galPage.gal1;

      disgal += galPage1 + gallery_val;

    } catch (SyntaxError) {
      disgal += '<font size="6"><b>No albums<b></font>';
    }
    return disgal

   };