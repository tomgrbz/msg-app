

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

io.on("connection", (socket) => {
    socket.on("chat message", (data) => {
        console.log("message received" + data)
        socket.emit("received message", data)
    })

});

httpServer.listen(3001, () => {
    console.log("server listening on port 3001")
});