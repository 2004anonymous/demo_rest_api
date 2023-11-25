const http = require('http');
const app = require('./app');
const port = process.env.PORT || 2004;

const server = http.createServer(app);

server.listen(port,()=>{console.log("Listning on port ",port)});