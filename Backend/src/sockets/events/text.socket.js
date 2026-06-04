function textSocket(io,socket)
{
    socket.on("text-moving",(data)=>{

       const { boardid, textId, x, y } = data;

       socket.to(boardid).emit("text-moving",{
              
            textId,
            x,
            y

       });
    });


    socket.on("text-typing",(data)=>{

       const { boardId, textId } = data;

       socket.to(boardId).emit("text-moving",{
         
           textId,
           user: {
              id: socket.user._id,
              nmae: socket.user.name
           }

       });

    });


}

module.exports = textSocket;