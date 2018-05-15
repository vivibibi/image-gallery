var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";


module.exports.loadGal = function(user, callback) {
    global.gallery_val = '';
    MongoClient.connect(uri, function(err, client) {
        const gallery = client.db("Users").collection("Gallery");
        gallery.find({
            username: user
        }).forEach(function(error, doc) {
            gallery_val += '<div id=galDiv <br> <b>' + error.title + '</b><br><div id=galDivPic <img id=galDivPic src=' + error.img_links + ' </div> </div>';
        });
        client.close();
        
    });
    setTimeout(function() {
        callback(gallery_val)
        }, 2000);

}