import 'babel-polyfill';

const videoName = window.location.href.split('#').pop();
const playerHtml = '<audio src="./videos/' + videoName + '" autoplay controls ></audio>';

document.querySelector('video-title').insertAdjacentHTML('beforeend', '<h1>' + videoName + '</h1>');
document.querySelector('player').insertAdjacentHTML('beforeend', playerHtml);
