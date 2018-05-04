const fs = require('fs');

/**
 * Saves a single image when you click on the favorite button to the favorites album (imgs.json)
 * @param {string} imgs - The URL of an image
 * @requires fs
 */

module.exports.favPic = (imgs) => {
   console.log('Favorite picture');

   var photolist = []

   photolist.push(imgs);

   var readimgs = fs.readFileSync('imgs.json');

   if (readimgs != '') {
       var dataimg = JSON.parse(readimgs);
       for (var i = 0; i < dataimg.length; i++) {
           photolist.push(dataimg[i])
       };
   };
   
   fs.writeFileSync('imgs.json', JSON.stringify(photolist));
   
};