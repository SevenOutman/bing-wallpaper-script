/**
 * Created by doma on 17-6-2.
 */
const fs = require('fs')
const path = require('path')
const request = require('request')
const wallpaper = require('wallpaper')

const today = new Date()
const makeQueryByDate = date => {
    let y = today.getFullYear()
    let m = today.getMonth() + 1
    let d = today.getDate()
    m = (m < 10 ? '0' : '') + m
    d = (d < 10 ? '0' : '') + d
    return `${y}${m}${d}`
}
const todayQuery = makeQueryByDate(today)
console.log(`User: ${process.env.USER}`)
console.log(`Date: ${todayQuery}`)
const fileName = `downloads/${todayQuery}.jpg`
// check if today's image exists
if (fs.existsSync(fileName)) {
//    image exists
//    check if it has been set as wallpaper
    let fullImagePath = path.resolve(__dirname, fileName)
    wallpaper.get().then(imagePath => {
        if (imagePath === fullImagePath) {
            console.log('Wallpaper up to date')
            wallpaper.get().then(imagePath => {
                console.log(`Current wallpaper: ${imagePath}`);
            });
        } else {
            console.log('Image already downloaded at: ' + fullImagePath)
            wallpaper.set(fullImagePath).then(() => {
                console.log('Set as wallpaper')
                wallpaper.get().then(imagePath => {
                    console.log(`Current wallpaper: ${imagePath}`);
                });
            })
        }
    });
} else {
    // image does not exist
    // download latest image and set as wallpaper
    const download = (uri, filename, callback) => {
        request.head(uri, function (err, res, body) {
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };

    const bingApiUrl = 'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1'
    request(bingApiUrl, (error, res, body) => {
        const json = JSON.parse(body)
        if (json.images) {
            let todayImageUrl = `http://www.bing.com${json.images[0].url}`
            console.log(`Image of ${todayQuery}: ${todayImageUrl}`)
            if (!fs.existsSync('downloads')) {
                fs.mkdirSync('downloads')
            }
            download(todayImageUrl, fileName, function () {
                console.log(`Saved as ${fileName}`)
                wallpaper.set(path.resolve(__dirname, fileName)).then(() => {
                    console.log('Set as wallpaper');
                    wallpaper.get().then(imagePath => {
                        console.log(`Current wallpaper: ${imagePath}`);
                    });
                });
            });
        }
    })
}