const express = require('express');
const path = require('path');
const sirv = require('sirv');
const bodyParser = require('body-parser');
const tokens = require('./tokens');
const videos = require('./videos');

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));

app.get('/api/tokens/record', (req, res) => {
    tokens.generateRecordToken().then(t => res.json(t));
});

app.get('/api/tokens/app', (req, res) => {
    res.json(tokens.getAppToken());
});

app.get('/api/tokens/view/:id', (req, res) => {
    tokens.generateViewToken(req.params.id).then(t => res.json(t));
});

app.get('/api/tokens/session', (req, res) => {
    tokens.generateSessionToken(req.params.id).then(t => res.json(t));
});

app.post('/api/recordings', (req, res) => {
    const { id, name } = req.body;

    videos.saveVideo(id, name).then(result => res.json({ id, fileName: result.name })).catch(err => { throw err; });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/views/recorder.html')));
app.get('/ziggeo-player', (req, res) => res.sendFile(path.join(__dirname, '/views/ziggeo-player.html')));
app.get('/player', (req, res) => res.sendFile(path.join(__dirname, '/views/player.html')));

app.use(sirv('dist', { dev: true }));
app.use(sirv('videos', { dev: true }));
app.use(sirv('client-sdk', { dev: true }));

app.listen(8030, () => console.log('Server running on port 8030'));
