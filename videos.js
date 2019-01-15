const fs = require('fs');
const { ziggeoSdk } = require('./ziggeoSDK');

function saveVideo(id, name) {
    const filePath = './videos/' + name;

    return new Promise((resolve, reject) => {
        const start = Date.now();

        console.log('started ' + start);

        // NOTE: In the itslearning product we found that in order to solve
        // issues where the video was not ready for download it is best to
        // get the video's streams (ziggeoSdk.Streams), filter by streams
        // that are in ready and STREAMABLE state (and retry after a wait
        // if there are no streams ready) and then download the video over
        // that stream. This method uses download_video to replicate the
        // issues we where having.

        ziggeoSdk.Videos.download_video(id, data => {
            fs.writeFile(filePath, data, error => {
                console.log('took ' + (Date.now() - start) + ' ms');

                if (error) {
                    reject(new Error(error));
                } else {
                    resolve({ name });
                }
            });
        }, (args, error) => {
            reject(new Error(error));
        });
    });
}

module.exports = {
    saveVideo
};
