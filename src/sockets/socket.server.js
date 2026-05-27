const { Server } = require('socket.io');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

function initSocketServer(httpServer)
{
    const io  = new Server(httpServer,{
        cors:{
            origin: "*"
        }
    });


    
}


module.exports = initSocketServer;



