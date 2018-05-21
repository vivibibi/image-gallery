const request = require('request');
const dbCred = require("./databaseCred.js");



/**
 * Retrieves thumbnails from a search query
 * @param {string} query - The query sent to the API
 * @requires request
 * @requires ./databaseCred.js 
 */
module.exports.getThumbnails = function(query, callback) {
    request({
        url: 'https://www.europeana.eu/api/v2/search.json?wskey=' + dbCred.apik + '&query=' + encodeURIComponent(query),
        json: true
    }, (error, response, body) => {
        var piclist = [];
        if (error) {
            console.log(error)
            callback("can't connect to europeana api");
        }
        if (response.statusCode == 401) {
            callback("API key is invalid");
        }
        if (response.statusCode == 429) {
            callback("Application has reached its usage limit");
        }
        if (response.statusCode == 200) {
            for (i = 0; i < body.items.length; i++) {
                try {
                    piclist.push(body.items[i].edmPreview[0])
                } catch (TypeError) {
                    callback('No images found');
                    break
                }
            }
            if (typeof piclist !== 'undefined' && piclist.length > 0) {
                callback(null, piclist);
            } 

        }

    });

};