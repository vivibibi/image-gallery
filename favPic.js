const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";

/**
 * Saves a single image when you click on the favorite button to the favorites album (imgs.json)
 * @param {string} imgs - The URL of an image
 * @requires fs
 */

module.exports.favPic = (imgs, user) => {
    var db_entry = {
        img_link: imgs,
        username: user
    }
    MongoClient.connect(uri, function(err, client) {
        const fav = client.db("Users").collection("Favorites");
        fav.insert({
            img_link: imgs,
            username: user
        });
        client.close();
    });
    return db_entry
};