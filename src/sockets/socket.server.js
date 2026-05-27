const { Server } = require('socket.io');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const userModel = require('../db/models/user.model');
const boardSocket = require('./events/board.socket');

function initSocketServer(httpServer)
{
    const io  = new Server(httpServer,{
        cors:{
            origin: "*"
        }
    });

    io.use(async (Socket, next)=>{
        
        const cookies = cookie.parse(Socket.handshake.header?.cookie || "");
        
        if(!cookies.token)
        {
            next(new Error("Authentication error: No token provided"));
        }

        try{
              const decoded = jwt.verify(cookies.token,process.env.JWT_SECRET);
              
              const user = await userModel.findById(decoded.id);

              Socket.user = user;

              next();

        }
        catch (error)
        {
            next (new Error("Authentication error: Invalid token"))
        }

    });


    io.on("connection",(socket)=>{

        console.log("User connected: ",socket.id);

        boardSocket(io,socket);


        socket.on("disconnect",()=>{
            
            console.log("User disconnect: ",socket.id);
        
        })
    });



}


module.exports = initSocketServer;



