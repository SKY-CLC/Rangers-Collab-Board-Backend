function boardSocket(io,socket)
{
    socket.on("join-board",(data)=>{

        const { boardId, user: { id,name } } = data;

        socket.join(boardId);

        console.log("User joined successfully");

        socket.to(boardId).emit("user-joined",
            {
                userId: id,
                name: name
        });

    });

   
    socket.on("leave-board",(data)=>{

        const { boardId, user: { id, name } } = data;

        socket.leave(boardId);

        console.log("User left");

        socket.to(boardId).emit("user-left",{
              
            userId: id,
            name: name
        });

    });

}

module.exports = boardSocket;