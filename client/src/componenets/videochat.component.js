import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

const  socket=io("http://localhost:5800");


const VideoChat = () => {

    const myVideo = useRef(null);
    const connectionRef = useRef(null)
    const userVideo = useRef(null);
    //stetes
    const [me,setMe]=useState("");
    const [acceptedCall,setAcceptedCall]=useState(false);
    const[receivedCall,setReceivedCall] = useState(false);
    const [stream,setStream]=useState(null);
    const [endcall,setEndcall]=useState(false);
    const [name,setName]=useState("test");
    const [idtocall,setIdtocall]=useState("");
    const [caller,setCaller]=useState();
    const [callerSignal,setCallersignal]=useState();
    const [rejected,setRejected]=useState(false);
    const [username,setuserName] =useState();
    useEffect(()=>{

      //  socket.on("me",(id)=>setMe(id));
       navigator.mediaDevices.getUserMedia(
            {
                video:true,
                audio:true,
            }
        ).then(st=>{ setStream(st); myVideo.current.srcObject=stream})
        socket.on("getingCall",(data)=>{
            setReceivedCall(true);
            setuserName(data.name)
            setCaller(data.from);
            setCallersignal(data.signal)
            console.log(data)
        })
      
    },[])

const accept = ()=>{
    setAcceptedCall(true);
    const peer = new Peer({
        initiator:false,
        trickle:false,
        stream:stream
    })
    peer.on("signal",(data)=>{
            socket.emit("callAccepted",{signal:data,to:caller})
    })
    peer.signal(callerSignal);
    peer.on("stream",st=>{
        userVideo.current.srcObject=stream

    })
}
const reject = ()=>{
    setRejected(true);
    setReceivedCall(false);
    socket.emit("rejectcall",{id:me,from:caller})
}
const callUser = ()=>{
    console.log("calling user"+idtocall)
    let peer = new Peer({
        initiator:true,
        trickle:false,
        stream:stream
    })
    connectionRef.current=peer;
    peer.on("signal",(data)=>{
        socket.emit("callUser",{
            senderSignal:data,
            from:me,
            to:idtocall,
            name:name
        })
    })
    peer.on("stream",st=>{
        userVideo.current.srcObject=stream
    })
    socket.on("callAccepted",data=>{
        console.log("call accep[ted")
        peer.signal(data.signal);
    })
    socket.on("reject",(data)=>{
        console.log("call rejected");
        connectionRef.current.destroy()
    })
}

const copy = () => {
    const el = document.createElement('textarea');
    el.value = me;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };


    return ( 
        <div className="videocomp">
            <div className="head">
                Zoom Clone
            </div>
            <div className="videogrp">
                    <div className="vid">
                            <li>{name}</li>
                            <video ref={myVideo}   autoPlay   muted  />
                    </div>
                    <div className="vid">
                            <li>{username}</li>
                            <video ref={userVideo}   autoPlay   muted  />
                    </div>

            </div>
            {
              (receivedCall&&!acceptedCall )&&
                <div className="received">
                        <li>Receiving call from {username}</li>
                        <div className="butts">
                            <button onClick={accept} >Answer</button>
                            <button onClick={reject}>Reject</button>
                        </div>
                </div>
            }
            <div className="addaller">
                <div className="name">
                   <li>Name</li>
                   <input type="text" value={name} onChange={e=>setName(e.target.value)} />
                </div>
                <button className="but" onClick={copy} >Copy ID</button>
                <div className="name i">
                   <li>ID to call</li>
                  <input tylie="text"  value={idtocall} onChange={e=>setIdtocall(e.target.value)} />
                </div>
                <div className="call">
                    <button onClick={callUser} >CALL</button>
                    <li>{idtocall}</li>

                    {
                        acceptedCall&&
                        <button onClick={console.log("call ended")}>End call</button>
                    }
                </div>
            </div>
        </div>
     );
}
 
export default VideoChat;