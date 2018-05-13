var validateAddAlbum = require("./addAlbum");
var validateFavPic = require("./favPic");
var validateGetThumbnails = require("./getThumbnails");
var validateloadImgs = require("./loadImgs.js");
var validateDisplayFav = require("./displayFav.js");
var validateLoadGal = require("./loadGal.js");
var validateDisplayGal = require("./displayGal.js");
var validateDisplayResults = require("./displayResults.js");
var validateCreateAccount = require("./createAccount.js");
var validateCheckPassword = require("./checkPassword.js");




var albums = validateAddAlbum.addAlbum("title", "url");
var fav = validateFavPic.favPic('https://www.europeana.eu/api/v2/thumbnail-by-url.json?uri=http%3A%2F%2Fzudusilatvija.lv%2Fstatic%2Ffiles%2F16%2F08%2F27%2F000060.png&size=LARGE&type=IMAGE');
var gt1 = validateGetThumbnails.getThumbnails("DoG", (errorMessage, results) => { return results })
var gt2 = validateGetThumbnails.getThumbnails("cat", (errorMessage, results) => { return errorMessage })
var gt3 = validateGetThumbnails.getThumbnails("gala", (errorMessage, results) => { return validateDisplayResults.displayResults(errorMessage, results) })
var gt4 = validateGetThumbnails.getThumbnails("cat", (errorMessage, results) => { return validateDisplayResults.displayResults(errorMessage, results) })

var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mongodb-stitch-europeana-bdhxh:whydoesntmongodbwork@europeanaimaging-porog.mongodb.net/Users?retryWrites=true";


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
        MongoClient.connect(uri, function(err, client) {
            const fav = client.db("Users").collection("Favorites");
            fav.find({
                username: null
            }).forEach(function(error, doc) {


                expect(error.img_link).toContain('https://www.europeana.eu/api/');


            });


            client.close();
        });


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
        setTimeout(function() {
            expect(validateloadImgs.loadImgs()).toContain('img src');
        }, 4000);

    });
});

describe("testing displayFav.js", () => {
    test("adds the html of the favorite page to the actual list of favorited imgs", () => {
        setTimeout(function() {
            expect(validateDisplayFav.displayFav()).toContain('Main Page');
        }, 4000);

    });
});

describe("testing loadGal.js", () => {
    test("adds html to the raw links of the albums", () => {
        setTimeout(function() {
            expect(validateLoadGal.loadGal()).toContain('id=galDiv');
        }, 4000);

    });
});

describe("testing displayGal.js", () => {
    test("combines the page's HTML with the albums' HTML", () => {
        setTimeout(function() {
            expect(validateDisplayGal.displayGal()).toContain("rel='stylesheet'");
        }, 4000);

    });
});

describe("testing displayResults.js", () => {
    test("combines the page's HTML with the albums' HTML", () => {
        setTimeout(function() {
            expect(gt3).toContain("Europeana Gallery: Results");
            expect(gt4).toContain("No images found");

        }, 4000);

    });
});



describe('testing createAccount.js', () => {
    test('creates an account', () => {
        expect(account).toHaveProperty('username');
        expect(account).toHaveProperty('password');
    });

    test('account exists within the database', () => {
        MongoClient.connect(uri, function(err, client) {
            const users = client.db("Users").collection("Users");
            users.find({
                username: "user"
            }).forEach(function(error, doc) {


                expect(error.username).toContain('user');
                expect(error.password).toContain('pass');

            });
        });

    });
});

var account = validateCreateAccount.createAccount("coolguy", "verycool");

describe.only("testing checkPassword.js", () => {
    test("verifies the password used to login", () => {
        setTimeout(function() {
            expect(validateCheckPassword.checkPassword(account.username, "pass")).toBeTruthy()
            expect(validateCheckPassword.checkPassword(account.username, "x")).toBeFalsy()

        }, 4000);

    });
});