var MongoClient = require('mongodb').MongoClient;
var dbCred = require("./databaseCred.js");

var album = {
    title: 'title',
    imgs: 'imgs',
};

/**
 * Creates an album of photos from search results
 * @param {string} title - the title of the album 
 * @param {string} imgs  - the images added to the album
 * @param {string} user  - the user to whom the album belongs to
 * @requires mongodb
 * @requires ./databaseCred.js
 * @returns {array} imglist - a list of album objects 
 */

module.exports.addAlbum = (title, imgs, user) => {


    var imglist = []

    album.title = title;
    album.imgs = imgs;

    imglist.push(album);

    MongoClient.connect(dbCred.uri, function(err, client) {


        const gallery = client.db("Users").collection("Gallery");
        gallery.insert({
            username: user,
            img_links: imgs,
            title: title
        });


        client.close();
    });
    return imglist
};