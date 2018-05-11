const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";

/** 
 * inserts all the favorited images into HTML code
 */



module.exports.loadImgs = function() {
    try {

        MongoClient.connect(uri, function(err, client) {
            global.favo_val = '';
            const gallery = client.db("Users").collection("Favorites");
            gallery.find({
                username: null
            }).forEach(function(error, doc) {

                global.favo_val += '<img src=' + error.img_link + ' <br>';
                
            });
            
            client.close();
            
        });


      
    } catch (SyntaxError) {
        favo_val += '<font size="6"><b>No favorite images<b></font>';
        return favo_val
    }

}