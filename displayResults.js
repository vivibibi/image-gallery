const request = require('request');
const fs = require('fs');


/**
 * Display searched images
 * @param {string} query - The query sent to the API
 * @requires request
 * @returns {list} piclist -  A list of HTML strings containing the image result's URLS.
 */

module.exports.displayResults = function(errorMessage, results) {
/** 
     * if there's no pictures returned, an error message will be displayed
     */
    var searchedpics = ''
    if (results == undefined) {
        console.log(errorMessage);
        searchedpics += '<h1>' + errorMessage + '</h1>';
    /** 
     * else the URLs will be encapsulated in HTML code and written to a JSON file
     */
    } else {
        global.formatThumbs = '<br>';
        global.listofimgs = [];
        global.galThumbs = '';

        for (i = 0; i < results.length; i++) {
           listofimgs.push(results[i]);
           galThumbs +=  '<div id="box' + i + '" class="boxes">' + '<img class=thumbnails id=pic'+ i + '  src=' + results[i] + '> </div>';
           formatThumbs += '<img class=thumbnails id=pic'+ i + '  src=' + results[i] + '><form id=favForm method=GET action=/favorite>'+
           '<button name=favorite id=favorite value=' + i + ' type=submit>❤</button></form>';
        }

        var readresults = fs.readFileSync('results.json');

        /** 
         * the JSON file is split into parts because we weren't able to use app.render properly
         */
        var total = JSON.parse(readresults);
        var part1 = total.part1;
        var part2 = total.part2;

        searchedpics += part1 + part2 + formatThumbs
      }
      return searchedpics
  };


