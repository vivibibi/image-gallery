var validateAddAlbum = require("./addAlbum")
var validateFavPic = require("./favPic")
var validateGetThumbnails = require("./getThumbnails")

var fs = require('fs');

var albums = validateAddAlbum.addAlbum("title", "url");
var fav = validateFavPic.favPic('https://www.europeana.eu/api/v2/thumbnail-by-url.json?uri=http%3A%2F%2Fzudusilatvija.lv%2Fstatic%2Ffiles%2F16%2F08%2F27%2F000060.png&size=LARGE&type=IMAGE');
var gt1 = validateGetThumbnails.getThumbnails("DoG", (errorMessage, results) => { return results })
var gt2 = validateGetThumbnails.getThumbnails("cat", (errorMessage, results) => { return errorMessage })

describe("testing addAlbum", () => {
    test("a valid album", () => {
        for (var i = 0; i < albums.length; i++) {
            expect(albums[i]).toHaveProperty('title');
            expect(albums[i]).toHaveProperty('imgs');
        }

    });
});

describe("testing fav", () => {
    test("a valid favPic", () => {
        var readimgs = fs.readFileSync('imgs.json');
        var dataimg = JSON.parse(readimgs);
        for (var i = 0; i < dataimg.length; i++) {
            expect(dataimg[i]).toContain('https://www.europeana.eu/api/');
        };

    });
});

describe("testing api", () => {
    test("a valid search", () => {
        setTimeout(function() {
            expect(gt1).toBeDefined();
            expect(gt2).toBeDefined();

        }, 4000);

    });
});