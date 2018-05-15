var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";
MongoClient.connect(uri, function(err, client) {
    console.log(client)
    const users = client.db("Users").collection("Users");
    users.insert({
        username: 'coolguy',
        password: 'verycool'
    });

    const images = client.db("Users").collection("Images");
    images.insert({
        img_link: 'https://www.tutorialspoint.com/mongodb/images/mongodb-mini-logo.jpg',
        username: 'coolguy',
        type: 0
    });

    const gallery = client.db("Users").collection("Gallery");
    gallery.insert({
        gal_id: '0',
        username: 'coolguy',
        img_links: ['https://www.tutorialspoint.com/mongodb/images/mongodb-mini-logo.jpg', 'https://www.tutorialspoint.com/mongodb/images/mongodb-mini-logo.jpg'],
        title: 'Mongo gets me like no one else'
    });


    client.close();
});