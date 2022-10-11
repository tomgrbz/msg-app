const { prismaJoin, db, addMsg, retrieveMsgs } = require("./db.js")
const { Server } = require("socket.io")
const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express();
app.use(cors())
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']}
    });

// app.get('/msgs', (req, res) => {
//     res.send()
// })
io.on("connection", (socket) => {

    socket.on('join room', (data) => {
        console.log(`user joined ${data.room}`)
        socket.join(data.room)
        prismaJoin(data.room, data.userName, socket.id).then(async () => {
            await db.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await db.$disconnect()
            process.exit(1)
        })
    })

    socket.on("chat message", (data) => {
        console.log("message received " + data.msg)
        console.log(`message sent to room: ${data.id}`)
        io.to(data.id).emit("received message", data.msg, data.user, data.id)
        addMsg(data.msg, socket.id, data.id).then(async () => {
            await db.$disconnect()
        }).catch(async (e) => {
            console.error(e)
            await db.$disconnect()
            process.exit(1)
        })
        retrieveMsgs(data.id, socket.id).then(async () => {
            await db.$disconnect()
        }).catch(async (e) => {
            console.error(e)
            await db.$disconnect()
            process.exit(1)
        })
    })


});

httpServer.listen(3001, () => {
    console.log("server listening on port 3001")
});