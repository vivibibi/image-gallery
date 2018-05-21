const MongoClient = require('mongodb').MongoClient;
const dbCred = require("./databaseCred.js");

/**
 * Saves a single image when you click on the favorite button to the database
 * @param {string} imgs - The URL of an image
 * @param {string} user - the username of the user
 * @requires mongodb
 * @requires ./databaseCred.js
 * @returns {object} db_entry - an object that contains an image and username
 */
module.exports.favPic = (imgs, user) => {
    var db_entry = {
        img_link: imgs,
        username: user
    }
    MongoClient.connect(dbCred.uri, function(err, client) {
        const fav = client.db("Users").collection("Favorites");
        fav.insert({
            img_link: imgs,
            username: user
        });
        client.close();
    });
    return db_entry
};