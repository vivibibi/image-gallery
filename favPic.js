const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";

/**
 * Saves a single image when you click on the favorite button to the favorites album (imgs.json)
 * @param {string} imgs - The URL of an image
 * @requires fs
 */

module.exports.favPic = (imgs) => {


    var photolist = []

    photolist.push(imgs);

    MongoClient.connect(uri, function(err, client) {


        const fav = client.db("Users").collection("Favorites");
        fav.insert({
            img_link: imgs,
            username: null
        });


        client.close();
    });

    
    /*
    var readimgs = fs.readFileSync('imgs.json');

    if (readimgs != '') {
        var dataimg = JSON.parse(readimgs);
        for (var i = 0; i < dataimg.length; i++) {
            photolist.push(dataimg[i])
        };
    };

    fs.writeFileSync('imgs.json', JSON.stringify(photolist));
    */
    return photolist
};