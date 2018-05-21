var MongoClient = require('mongodb').MongoClient;
var dbCred = require("./databaseCred.js");

/**
 * loads all the users albums from the database
 * @param {string} user       - the user's username
 * @param {function} callback - returns the results of the retrieval from the database
 * @requires mongodb
 * @requires ./databaseCred.js 
 */


module.exports.loadGal = function(user, callback) {
    global.gallery_val = "<body onclick='getID(this.id)'><div id='images'>";
    MongoClient.connect(dbCred.uri, function(err, client) {
        const gallery = client.db("Users").collection("Gallery");
        gallery.find({
            username: user
        }).forEach(function(error, doc) {
            gallery_val += '<div>' + error.title + '</div>' + error.img_links;
        });
        setTimeout(function() {
            gallery_val += "<img id='bin' src='bin.jpg' /></div><div id='greyBack'></div><script type='text/javascript'> var greyBack = document.getElementById('greyBack'), defLeft = null, defRight = null, defTop = null, defBottom = null, defMargin = null, currentDiv = null, bin = document.getElementById('bin'), previousDiv = null; function getID(e) { e = e || window.event; e = e.target || e.srcElement; if (e.className == 'thumbnails') { zoomIn(e); currentDiv = e } else if (e.id == 'greyBack') { zoomOut(currentDiv); } else if (e.id == 'bin') { zoomOut(currentDiv); removeImage(currentDiv); } } function zoomIn(element) { defLeft = element.style.left, defRight = element.style.right, defTop = element.style.top, defBottom = element.style.bottom, defMargin = element.style.margin; element.style.position = 'fixed'; element.style.transform = 'scale(5)'; element.style.zIndex = '1'; element.style.left = '0px'; element.style.right = '0px'; element.style.top = '0px'; element.style.bottom = '0px'; element.style.margin = 'auto'; greyBack.style.zIndex = '0'; greyBack.style.opacity = '0.75'; bin.style.display = 'block' } function zoomOut(element) { element.style.position = 'relative'; element.style.transform = 'scale(1)'; element.style.zIndex = '0'; element.style.left = defLeft; element.style.right = defRight; element.style.top = defTop; element.style.bottom = defBottom; element.style.margin = defMargin; greyBack.style.zIndex = '-1'; greyBack.style.opacity = '0'; bin.style.display = 'none' } function removeImage(e) { e.parentNode.removeChild(e); } </script></html>";
   
        }, 1000);
        
        client.close();
        
    });
    setTimeout(function() {
             callback(gallery_val)
        }, 3000);


}