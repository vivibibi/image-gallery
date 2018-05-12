const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";


var album = {
    title: 'title',
    imgs: 'imgs',
};

module.exports.addAlbum = (title, imgs) => {


    var imglist = []

    album.title = title;
    album.imgs = imgs;

    imglist.push(album);

    MongoClient.connect(uri, function(err, client) {


        const gallery = client.db("Users").collection("Gallery");
        gallery.insert({
            username: null,
            img_links: imgs,
            title: title
        });


        client.close();
    });
    return imglist
};