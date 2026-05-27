function cardSocket(io,socket)
{
    socket.on("card-moved",(data)=>{
        const { boardId, cardId, position } = data;

        socket.to(boardId).emit("card-moved",{
            cardId,
            position
        });
    });

    socket.on("card-typing",(data)=>{

        const { boardId, cardId } = data;

        socket.to(boardId).emit("card-moved",{

            cardId,

            user: {
                id: socket.user._id,
                name: socket.user.name
            }
        });

    });
}


module.exports = cardSocket;