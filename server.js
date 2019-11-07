const http = require('http');
const app = require('./src/app');

const server = http.createServer(app);
app.set('port', process.env.PORT || 3000);

server.listen(process.env.PORT || 3000);
