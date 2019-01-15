const baseConfig = require('@itslearning/protomorph/webpack.config');
const path = require('path');

const entry = {
    recorder: './views/recorder.js',
    player: './views/player.js',
    'ziggeo-player': './views/ziggeo-player.js'
};

const config = Object.assign({}, baseConfig, {
    entry,
    output: {
        path: path.join(__dirname, './dist/'),
        filename: '[name].js'
    }
});

module.exports = config;
