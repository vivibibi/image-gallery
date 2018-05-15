var validateGetThumbnails = require("./getThumbnails");
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";
var validateloadImgs = require("./loadImgs.js");
var validateCheckPassword = require("./checkPassword.js");
var validateDisplayResults = require("./displayResults.js");

validateGetThumbnails.getThumbnails('dog', (errorMessage, results) => {
    console.log(errorMessage)
    console.log(results)
})

validateloadImgs.loadImgs('jfds', (result) => {
            console.log(result)
        });

validateGetThumbnails.getThumbnails("cat", (errorMessage, results) => {
            console.log(validateDisplayResults.displayResults(errorMessage, results))
        });
/*
MongoClient.connect(uri, function(err, client) {
    const users = client.db("Users").collection("Users");
    users.find({
        username: 'coolguy'
    }).forEach(function(error, doc) {
        console.log(validateCheckPassword.checkPassword(error.password, "verycool"))
    });
    client.close();

});

*/