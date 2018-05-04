const fs = require('fs');

var album = {
    title: 'title',
    imgs: 'imgs',
};

module.exports.addAlbum = (title, imgs) => {
    console.log('Adding album');

    var imglist = []

    album.title = title;
    album.imgs = imgs;

    imglist.push(album);

    var readalbum = fs.readFileSync('album.json');

    if (readalbum != '') {
        var data = JSON.parse(readalbum);

        for (var i = 0; i < data.length; i++) {
            imglist.push(data[i])
        };
    };
    
    fs.writeFileSync('album.json', JSON.stringify(imglist));
    return imglist
};