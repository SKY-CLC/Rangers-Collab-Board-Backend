function shapeSocket(io,socket)
{
    socket.on("shape-moving",(data)=>{

       const { boardId, shapeId, position } = data;

       socket.to(boardId).emit("shape-moving",{
           shapeId,
           position
       });

    });


    socket.on("shape-resizing",(data)=>{

        const { boardId,shapeId,width,height } = data;

        socket.to(boardId).emit("shape-resizing",{
            shapeId,
            width,
            height
        });

    });


    socket.on("shape-drawing",(data)=>{

        const { boardId, shapeId, points } = data;

        socket.to(boardId).emit("shape-drawing",{
            shapeId,
            points
        })
    })


}