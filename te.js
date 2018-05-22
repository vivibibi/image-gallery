var validateloadImgs = require("./loadImgs.js");

validateloadImgs.loadImgs('sjk', (result) => {
	setTimeout(function() {
            console.log(result)
        }, 2000);
            
        });