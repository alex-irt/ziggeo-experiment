window.onload = init;

const audio = true;

function init() {
    fetch('http://localhost:8030/api/tokens/app')
        .then(response => response.json()).then(initZiggeoApi);
}

function initZiggeoApi(response) {
    new window.ZiggeoApi.V2.Application({
        token: response.appToken,
        webrtc_streaming: false,
        auth: true
    }).on('ready', initRecorder);
}

function initRecorder() {
    fetch('http://localhost:8030/api/tokens/record')
        .then(response => response.json()).then(initZiggeoRecorder);
}

function initZiggeoRecorder(auth) {
    // Ziggeo language codes: https://ziggeo.com/features/language-support
    const languageCode = 'no';

    window.ZiggeoApi.V2.Locale.mainLocale.register({
        'ziggeoplayer.video-processing': '{ i18n.uploading } ',
    }, ['language:' + languageCode], 10);

    window.ZiggeoApi.V2.Locale.mediaLocale.register({
        'ba-videorecorder-chooser.upload-video': '{ i18n.upload } ',
        'ba-videorecorder-chooser.record-video': '{ i18n.record } ',
        'ba-videorecorder.access-forbidden': '{ i18n.deviceErrorMessage } ',
    }, ['language:' + languageCode], 10);

    window.ZiggeoApi.V2.Locale.setLocale(languageCode);
    window.ZiggeoApi.V2.Locale.mediaLocale.setLocale(languageCode);

    const recorder = new window.ZiggeoApi.V2.Recorder({
        element: document.getElementById('recorder'),
        attrs: {
            'server-auth': auth.token,
            width: 500,
            height: 400,
            allowcustomupload: true,
            theme: 'modern',
            themecolor: 'green',
            onlyaudio: audio,
            skipinitial: true,
        }
    });

    const extension = audio ? 'm4a' : 'mp4';

    recorder.on('processed', () => {
        triggerDownload(recorder.get('video'), 'on-processed.' + extension);

        setTimeout(() => {
            triggerDownload(recorder.get('video'), 'on-processed-after-30-seconds.' + extension);
        }, 30000);
    });

    recorder.on('verified', () => {
        triggerDownload(recorder.get('video'), 'on-verified.' + extension);
    });

    recorder.activate();
}

function triggerDownload(id, name) {
    fetch('http://localhost:8030/api/recordings/', {
        method: 'POST',
        body: JSON.stringify({ id, name }),
        headers: { 'content-type': 'application/json' }
    }).then(res => res.json()).then(response => insertLinks(response, name));
}

function insertLinks(response, name) {
    const ziggeoLink = '<a href="./ziggeo-player#' + response.id + '"> ziggeo player</a>';
    const playerLink = '<a href="./player#' + response.fileName + '"> html5 player: downloaded video</a>';
    const links = document.getElementById('links');

    links.insertAdjacentHTML('beforeend', name + ': ' + ziggeoLink + ' - ' + playerLink + '<br />');
}
