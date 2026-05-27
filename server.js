require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
const initSocketServer = require('./src/sockets/socket.server');

const http = require('http');
const httpServer = http.createServer(app);


connectDB();
const io = initSocketServer(httpServer);
app.set("io", io);

httpServer.listen(3000,()=>{
   console.log("Server is running");
});