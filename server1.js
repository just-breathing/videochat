const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(http, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", ":POST"]
    }
})
const port = 5800;
app.use(cors());
app.use(express.json());
let users = [];
io.on("connection", socket => {
    socket.emit("me", socket.id)

    socket.on("joinroom", data => {
        console.log(data)
        socket.emit("getUsers", users);
        const newUser = { id: data.id, name: data.name };
        users.push(newUser);
        socket.on("calluser", data => {
            console.log("call user");
            socket.broadcast.to(data.to).emit("gettingcall", { to: data.to, from: data.from, signal: data.signal, name: data.name })
        })
        socket.on("acceptingcall", data => {
            console.log("caccepting call");
            socket.broadcast.to(data.to).emit("ack", { from: data.from, signal: data.signal })
        })
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("userleft", { id: socket.id })
    })
})


http.listen(port, () => console.log("listening on port " + port))