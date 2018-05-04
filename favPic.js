const fs = require('fs');

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
   return photolist
};