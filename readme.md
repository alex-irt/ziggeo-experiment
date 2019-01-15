# ziggeo experiment

Sandbox for testing ziggeo configuration

## Configuration

Set up your Ziggeo app token and keys in `./ZiggeoSDK.js` and `./views/ziggeo-player.html`.

## Running

Run with yarn or npm. For the simplest setup run:

`npm run all` or `yarn all`

and browse to http://localhost:8030

## Testing versions

`./client-sdk` contains multiple versions of Ziggeo, change which one is loaded by editing
the following lines in `./views/recorder.html` and `./views/ziggeo-player.html`.

```html
    <link rel="stylesheet" href="/v2.31.2-2018-04-18.css" />
    <script src="/v2.31.2-2018-04-18.js"></script>
```
