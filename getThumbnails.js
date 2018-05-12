
const request = require('request');


/**
 * Retrieves thumbnails from a search query
 * @param {string} query - The query sent to the API
 * @requires request
 * @returns {list} piclist -  A list of HTML strings containing the image result's URLS.
 */

module.exports.getThumbnails = function(query, callback) {
    request({
        url: 'https://www.europeana.eu/api/v2/search.json?wskey=BScfR482T&query=' + encodeURIComponent(query),
        json: true
    }, (error, response, body) => {
        var piclist = [];
        if (error) {
            console.log(error)
            callback("can't connect to europeana api");
        } else if (response.statusCode == 401) {
            callback("API key is invalid");

        } else if (response.statusCode == 429) {
            callback("Application has reached its usage limit");

        } else if (response.statusCode == 200) {
            for (i = 0; i < body.items.length; i++) {
                try {
                    piclist.push(body.items[i].edmPreview[0])
                } catch (TypeError) {
                    //console.log(Error);
                }
            }
            if (typeof piclist !== 'undefined' && piclist.length > 0){
                callback(null, piclist);
            } else {
                callback('No images found');
            }
            
        } else {callback('No images found');}
  
    });
  
};