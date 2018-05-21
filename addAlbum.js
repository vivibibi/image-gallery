const MongoClient = require('mongodb').MongoClient;

const dbCred = require("./databaseCred.js");

/** 
 * object where album title and img links is stored
 */
var album = {
    title: 'title',
    imgs: 'imgs',
};

/**
 * Submits an album to the database.
 * @param {string} title - the title of the album 
 * @param {string} imgs  - the images added to the album
 * @param {string} user  - the user to whom the album belongs to
 * @requires mongodb
 * @requires ./databaseCred.js 
 * @returns {array} imglist - a list of album objects 
 */
module.exports.addAlbum = (title, imgs, user) => {
    /** 
     * parameters are inserted into the album object and added to a list
     */
    var imglist = []
    album.title = title;
    album.imgs = imgs;
    imglist.push(album);
    /** 
     * album is sent to the database
     */
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