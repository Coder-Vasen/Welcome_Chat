// socketIoHandler.js
import { Server } from 'socket.io';

export default function injectSocketIO(server: any) {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log(`Socket connected with Id: ${socket.id}`)
        
        socket.emit("connected", {
            message: "Successfull Connection",
            time: new Date().toLocaleTimeString()
        })

        socket.on("message", msg => {
            socket.broadcast.emit("newmsg", msg)
        })
    });

    console.log('SocketIO injected');
}