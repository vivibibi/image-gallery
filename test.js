var validateAddAlbum = require("./addAlbum");
var validateFavPic = require("./favPic");
var validateGetThumbnails = require("./getThumbnails");
var validateloadImgs = require("./loadImgs.js");

var validateLoadGal = require("./loadGal.js");

var validateDisplayResults = require("./displayResults.js");
var validateCreateAccount = require("./createAccount.js");
var validateCheckPassword = require("./checkPassword.js");

var albums = validateAddAlbum.addAlbum("title", "url", 'coolguy');


var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";


describe("testing addAlbum", () => {
    test("a valid album", () => {
        for (var i = 0; i < albums.length; i++) {
            expect(albums[i]).toHaveProperty('title');
            expect(albums[i]).toHaveProperty('imgs');
        }
    });
    test("album is in database", () => {

        MongoClient.connect(uri, function(err, client) {
            const fav = client.db("Users").collection("Gallery");
            fav.find({
                username: 'coolguy'
            }).forEach(function(error, doc) {


                expect(error.img_links).toContain('url');
                expect(error.title).toContain('title');

            });


            client.close();
        });
    });
})

var fav = validateFavPic.favPic('https://www.europeana.eu/api/v2/thumbnail-by-url.json?uri=http%3A%2F%2Fzudusilatvija.lv%2Fstatic%2Ffiles%2F16%2F08%2F27%2F000060.png&size=LARGE&type=IMAGE', "Guest");


describe("testing fav", () => {
    test("a valid favPic", () => {
        MongoClient.connect(uri, function(err, client) {
            const fav = client.db("Users").collection("Favorites");
            fav.find({
                username: 'guest'
            }).forEach(function(error, doc) {
                expect(error.img_link).toContain('https://www.europeana.eu/api/v2/thumbnail-by-url.json?uri=http%3A%2F%2Fzudusilatvija.lv%2Fstatic%2Ffiles%2F16%2F08%2F27%2F000060.png&size=LARGE&type=IMAGE');


            });


            client.close();
        });


    });

    test("a valid database entry", () => {
        expect(fav).toHaveProperty('img_link');
        expect(fav).toHaveProperty('username');
    });
});



describe("testing api", () => {
    test("a valid search", () => {
        validateGetThumbnails.getThumbnails("DoG", (errorMessage, results) => {
            expect(results).toBeDefined();
            expect(errorMessage).toBeNull();
        })
    });
    test("a search with no results", () => {
        validateGetThumbnails.getThumbnails("cat", (errorMessage, results) => {
            expect(errorMessage).toBeDefined();
            expect(results).toBeUndefined();
            expect(errorMessage).toContain('No images found');
        })
    });
});


describe("testing loadImgs.js", () => {
    test("loads a list of imgs into a string", () => {
        setTimeout(function() {
            expect(validateloadImgs.loadImgs()).toContain('img src');
        }, 4000);

    });
});



describe("testing loadGal.js", () => {
    test("adds html to the raw links of the albums", () => {
        validateLoadGal.loadGal('coolguy', (results) => {
            expect(results).toContain('id=galDiv');
        })
        


    });
});



describe("testing displayResults.js", () => {
    test("combines the page's HTML with the albums' HTML", () => {
        validateGetThumbnails.getThumbnails("gala", (errorMessage, results) => {
            expect(validateDisplayResults.displayResults(errorMessage, results)).toContain("<img class=thumbnails");
        })
        validateGetThumbnails.getThumbnails("cat", (errorMessage, results) => {
            expect(validateDisplayResults.displayResults(errorMessage, results)).toContain("No images found");
        })
    });
});


var account = validateCreateAccount.createAccount("coolguy", "verycool");
var mockacc = { username: 'coolguy', password: 'verycool' }

describe('testing createAccount.js', () => {
    test('creates an account', () => {
        expect(account).toHaveProperty('username');
        expect(account).toHaveProperty('password');
    });

    test('account exists within the database', () => {
        MongoClient.connect(uri, function(err, client) {
            const users = client.db("Users").collection("Users");
            users.find({
                username: "coolguy"
            }).forEach(function(error, doc) {
                expect(error.username).toContain('coolguy');
                expect(error.password).toContain('verycool');

            });
        });

    });
});




describe("testing checkPassword.js", () => {
    test("verifies a valid password", () => {
        validateCheckPassword.checkPassword(mockacc.password, "verycool");
    });

    test("verifies an invalid password", () => {
        validateCheckPassword.checkPassword(mockacc.password, "x");
    });

    test("verifies username doesnt exist", () => {
        validateCheckPassword.checkPassword('y', "verycool");
    });
});