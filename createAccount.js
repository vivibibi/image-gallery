var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";

module.exports.createAccount = function(user, pass) {
    var acc = {
        username: user,
        password: pass,
    };
    MongoClient.connect(uri, function(err, client) {
        const users = client.db("Users").collection("Users");
        users.insert({
            username: user,
            password: pass
        });

        client.close();
    });
    return acc
}