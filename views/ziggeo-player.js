import 'babel-polyfill';
import 'whatwg-fetch';

window.app.on('ready', init);

async function init() {
    const videoId = window.location.href.split('#').pop();
    const auth = await fetch('http://localhost:8030/api/tokens/view/' + videoId)
        .then(response => response.json());

    const player = new window.ZiggeoApi.V2.Player({
        element: document.querySelector('player'),
        attrs: {
            width: 500,
            height: 400,
            theme: 'modern',
            themecolor: 'red',
            'server-auth': auth.token,
            video: videoId
        }
    });

    player.activate();
}
