const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = 3001;

app.use(express.static(__dirname + '/dist/torrents-manager'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log('Running...'));