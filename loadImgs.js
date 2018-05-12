const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";

/** 
 * inserts all the favorited images into HTML code
 */



module.exports.loadImgs = function() {
    global.favo_val = '';
    
    try {

        MongoClient.connect(uri, function(err, client) {

            const gallery = client.db("Users").collection("Favorites");
            gallery.find({
                username: null
            }).forEach(function(error, doc) {

                favo_val += '<img src=' + error.img_link + ' <br>';
               
            });

            client.close();
            setTimeout(function() {
                return favo_val
            }, 4000);

        });




    } catch (SyntaxError) {
        favo_val += '<font size="6"><b>No favorite images<b></font>';
        return favo_val
    }

}