const express = require("express");
const cors  = require("cors");
const app =  express();
const formatMsg = require("./formatmsg");
const {userJoin,getCurrentUser,leaveRoom,getRoomUsers} = require("./users")
require("dotenv").config();
app.use(cors());
app.use(express.json());

const http = require('http').createServer(app);
const io = require("socket.io")(http,{
    cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
    }
    });

const botName = "chatcord Bot";

//runs when a user connnects
io.on("connection",socket=>{
    socket.emit("me",socket.id)
    //runs when user joins a room
    socket.on("jr",(det)=>{
        const {user,room}=det
        const User=userJoin(socket.id,user,room)
        socket.join(User.room);
        //welcome new user
        socket.emit("msg",formatMsg(botName,'welcome to chatcord!'));
        //send msg to every one in that group that a new user has joined
        socket.broadcast.to(User.room).emit('msg',formatMsg(botName,user+" has joined the chat"));

        io.to(User.room).emit('roomusers',getRoomUsers(User.room));
    })
     socket.on("callUser",(data)=>{
         io.to(data.to).emit("getingCall",{signal:data.senderSignal,from:data.from,name:data.name})
     })
     socket.on("callAccepted",(data)=>{
         io.to(data.to).emit("callAccepted",{signal:data.signal})
     })
     socket.on("rejectcall",(data)=>{
        io.to(data.from).emit("reject",{id:data.id})
     })
    //runs when a client sends msg to room
    socket.on("chat-msg",(msg)=>{
        const user = getCurrentUser(socket.id)
        socket.broadcast.to(user.room).emit("chat-msg",msg);
    })
  
    //runs when client disconnects
    socket.on("disconnect",()=>{
       // const User = leaveRoom(socket.id)
        //io.to(User.room).emit("msg",formatMsg(botName,User.user+" has left the chat"));
        //io.to(User.room).emit('roomusers',getRoomUsers(User.room));
        socket.broadcast.emit("Call Ended",socket.id)

    })
})


app.get("/",(req,res)=>{
    res.send("got /");
    console.log("ok got it");
})

const port = process.env.port;
http.listen(port,()=>console.log(`listening on port ${port}`));