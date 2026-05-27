function boardSocket(io,socket)
{
    socket.on("join-board",(data)=>{

        const { boardId } = data;

        socket.join(boardId);

        console.log("User joined successfully");

        socket.to(boardId).emit("user-joined",
            {
                userId: socket.user._id,
                name: socket.user.name
        });

    });

   
    socket.on("leave-board",(data)=>{

        const { boardId } = data;

        socket.leave(boardId);

        console.log("User left");

        socket.to(boardId).emit("user-left",{
              
            userId: socket.user._id,
            name: socket.user.name
        });

    });

}

module.exports = boardSocket;