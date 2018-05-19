/** 
 * Mongodb function used to connect to the database
 */
const MongoClient = require('mongodb').MongoClient;
/** 
 * File with credentials needed to access the database
 */
const dbCred = require("./databaseCred.js");

/**
 * loads all the users favorite images from the database
 * @param {string} user       - the user's username
 * @param {function} callback - returns the results of the retrieval from the database
 * @requires mongodb
 * @requires ./databaseCred.js 
 */
module.exports.loadImgs = function(user, callback) {
    global.favo_val = '';
    MongoClient.connect(dbCred.uri, function(err, client) {
        const gallery = client.db("Users").collection("Favorites");
        gallery.find({
            username: user
        }).forEach(function(error, doc) {
            favo_val += '<img src=' + error.img_link + ' <br>';
        });
        client.close();


    });
    setTimeout(function() {
        callback(favo_val)
        
    }, 2000);


}