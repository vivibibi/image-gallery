var validateAddAlbum = require("./addAlbum")
var validateFavPic = require("./favPic")
var validateGetThumbnails = require("./getThumbnails")

describe("testing", () => {
	test("a valid album", () => {
		expect(validateAddAlbum.addAlbum(["title","url"])).toBeDefined()
	});
});

describe("testing fav", () => {
	test("a vaild favPic", () => {
		expect(validateFavPic.favPic(['img', 'imgs'])).toBeDefined()
		});
});

describe("testing api", () => {
	test("a valid search", () => {
		expect(validateGetThumbnails.getThumbnails("DoG")).toBeDefined()
	});
});