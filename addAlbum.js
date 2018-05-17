const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var dbCred = require("./databaseCred.js");

var album = {
    title: 'title',
    imgs: 'imgs',
};

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