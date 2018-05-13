const request = require('request');
const fs = require('fs');


/**
 * Display searched images
 * @param {string} query - The query sent to the API
 * @requires request
 * @returns {list} piclist -  A list of HTML strings containing the image result's URLS.
 */

module.exports.displayResults = function(errorMessage, results) {
    var searchedpics = ''
    /** 
     * if there's no pictures returned, an error message will be displayed
     */

    if (results == undefined) {
        console.log(errorMessage);
        searchedpics += '<h1>' + errorMessage + '</h1>';
        /** 
         * else the URLs will be encapsulated in HTML code and written to a JSON file
         */
    } else {
        global.formatThumbs = '<br>';
        global.listofimgs = [];
        global.galThumbs = '<br>';

        for (i = 0; i < results.length; i++) {
            listofimgs.push(results[i]);
            galThumbs += '<img class=thumbnails src=' + results[i] + '>';
            formatThumbs += '<img class=thumbnails src=' + results[i] + '><form id=favForm method=GET action=/favorite>' +
                '<button name=favorite id=favorite value=' + i + '' + ' type=submit>❤</button></form>';
        }

        
    }
    return formatThumbs
};