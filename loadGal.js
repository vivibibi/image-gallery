const fs = require('fs');

module.exports.loadGal = function() {
    try {
        var readalbum = fs.readFileSync('album.json');
        var piclist = JSON.parse(readalbum);
        var gallery_val = "<body onclick='getID(this.id)'><div id='images'>";
        for (var i = 0; i < piclist.length; i++) {
            gallery_val += '<div>' + piclist[i].title + '</div>' + piclist[i].imgs;
            
        }
        gallery_val += "<img id='bin' src='bin.jpg' /></div><div id='greyBack'></div><a id='mainBut' href='/' class='button'>Main Page</a><script type='text/javascript'> var greyBack = document.getElementById('greyBack'), defLeft = null, defRight = null, defTop = null, defBottom = null, defMargin = null, currentDiv = null, bin = document.getElementById('bin'), previousDiv = null; function getID(e) { e = e || window.event; e = e.target || e.srcElement; if (e.className == 'boxes') { zoomIn(e); currentDiv = e } else if (e.id == 'greyBack') { zoomOut(currentDiv); } else if (e.id == 'bin') { zoomOut(currentDiv); removeImage(currentDiv); } } function zoomIn(element) { defLeft = element.style.left, defRight = element.style.right, defTop = element.style.top, defBottom = element.style.bottom, defMargin = element.style.margin; element.style.position = 'absolute'; element.style.transform = 'scale(5)'; element.style.zIndex = '1'; element.style.left = '0px'; element.style.right = '0px'; element.style.top = '0px'; element.style.bottom = '0px'; element.style.margin = 'auto'; greyBack.style.zIndex = '0'; greyBack.style.opacity = '0.75'; bin.style.display = 'block' } function zoomOut(element) { element.style.position = 'relative'; element.style.transform = 'scale(1)'; element.style.zIndex = '0'; element.style.left = defLeft; element.style.right = defRight; element.style.top = defTop; element.style.bottom = defBottom; element.style.margin = defMargin; greyBack.style.zIndex = '-1'; greyBack.style.opacity = '0'; bin.style.display = 'none' } function removeImage(e) { e.parentNode.removeChild(e); } </script></body></html>";

    } catch (SyntaxError) {
        gallery_val += '<font size="6"><b>No albums<b></font>';
    }
    return gallery_val
}