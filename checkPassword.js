var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";

module.exports.checkPassword = function(user, pass, callback) {
    MongoClient.connect(uri, function(err, client) {
        const users = client.db("Users").collection("Users");
        users.find({
            username: user
        }).forEach(function(error, doc) {
            if (pass === error.password) {
                callback(true)
            } else {
            	callback(false)
            }

        });
        client.close();

    });
}




