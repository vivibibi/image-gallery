var MongoClient = require('mongodb').MongoClient;
var dbCred = require("./databaseCred.js");
/** 
 * inserts all the favorited images into HTML code
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