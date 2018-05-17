var MongoClient = require('mongodb').MongoClient;
var dbCred = require("./databaseCred.js");

module.exports.createAccount = function(user, pass) {
    var acc = {
        username: user,
        password: pass,
    };
    MongoClient.connect(dbCred.uri, function(err, client) {
        const users = client.db("Users").collection("Users");
        users.insert({
            username: user,
            password: pass
        });

        client.close();
    });
    return acc
}