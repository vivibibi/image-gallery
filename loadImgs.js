const fs = require('fs');

/** 
 * inserts all the favorited images into HTML code
 */


module.exports.loadImgs = function() {


    MongoClient.connect(uri, function(err, client) {
        global.fav_val = '';
        const gallery = client.db("Users").collection("Favorites");
        gallery.find({
            username: null
        }).forEach(function(error, doc) {
        	console.log(error);
            global.fav_val += '<img src=' + error.img_link + ' <br>';


        });


        client.close();
        return fav_val
    });

    


}