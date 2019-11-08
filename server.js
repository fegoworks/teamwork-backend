const http = require('http');
const app = require('./src/app');

const server = http.createServer(app);

const port = process.env.PORT || '3000';
app.set('port', port);

server.on('listening', () => {
  console.log(`Listening on port: ${port}`);
});

server.listen(port);
