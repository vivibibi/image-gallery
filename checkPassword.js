var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";

module.exports.checkPassword = function(user, pass) {
    MongoClient.connect(uri, function(err, client) {

        const users = client.db("Users").collection("Users");
        users.find({
            username: user
        }).forEach(function(error, doc) {


            if (pass === error.password) {
                return true
            } else {
                return false
            }

        });

        client.close();
    });
}