
var validateAddAlbum = require("./addAlbum");
var validateFavPic = require("./favPic");
var validateGetThumbnails = require("./getThumbnails");
var validateloadImgs = require("./loadImgs.js");
var validateDisplayFav = require("./displayFav.js");
var validateLoadGal = require("./loadGal.js");
var validateDisplayGal = require("./displayGal.js");
var validateDisplayResults = require("./displayResults.js");

var fs = require('fs');

var albums = validateAddAlbum.addAlbum("title", "url");
var fav = validateFavPic.favPic('https://www.europeana.eu/api/v2/thumbnail-by-url.json?uri=http%3A%2F%2Fzudusilatvija.lv%2Fstatic%2Ffiles%2F16%2F08%2F27%2F000060.png&size=LARGE&type=IMAGE');
var gt1 = validateGetThumbnails.getThumbnails("DoG", (errorMessage, results) => { return results })
var gt2 = validateGetThumbnails.getThumbnails("cat", (errorMessage, results) => { return errorMessage })
var gt3 = validateGetThumbnails.getThumbnails("gala", (errorMessage, results) => { return validateDisplayResults.displayResults(errorMessage, results) })
var gt4 = validateGetThumbnails.getThumbnails("cat", (errorMessage, results) => { return validateDisplayResults.displayResults(errorMessage, results) })

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

describe("testing loadImgs.js", () => {
	test("loads a list of imgs into a string", () => {
		expect(validateloadImgs.loadImgs()).toContain('img src');
	})
})

describe("testing displayFav.js", () => {
	test("adds the html of the favorite page to the actual list of favorited imgs", () => {
		expect(validateDisplayFav.displayFav()).toContain('Main Page');
	})
})

describe("testing loadGal.js", () => {
	test("adds html to the raw links of the albums", () => {
		expect(validateLoadGal.loadGal()).toContain('id=galDiv');
	})
})

describe("testing displayGal.js", () => {
	test("combines the page's HTML with the albums' HTML", () => {
		expect(validateDisplayGal.displayGal()).toContain("rel='stylesheet'");
	})
})

describe("testing displayResults.js", () => {
	test("combines the page's HTML with the albums' HTML", () => {
		setTimeout(function() {
            expect(gt3).toContain("Europeana Gallery: Results");
            expect(gt4).toContain("No images found");

        }, 4000);
		
	})
})
