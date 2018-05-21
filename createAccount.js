const MongoClient = require('mongodb').MongoClient;
const dbCred = require("./databaseCred.js");

/**
 * Create an account that will be stored in the database
 * @param {string} user - the username entered by the user 
 * @param {string} pass - the password entered by the user
 * @requires mongodb
 * @requires ./databaseCred.js 
 * @returns {object} acc - an object that contains the username and password that will be stored in the database
 */
module.exports.createAccount = function(user, pass) {
    /** 
     * object where account username/password is stored
     */
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