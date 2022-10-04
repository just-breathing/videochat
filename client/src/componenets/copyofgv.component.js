import { useEffect, useRef, useState } from "react";
import  io  from "socket.io-client";
import Peer from "simple-peer"
const socket= io("http://localhost:5800")
const CGV = () => {

    const [receivedcall,setReceivedcall]=useState(false);
    const [me,setMe]= useState({
        id:"",
        name:"",
        stream:""
    });
    const [users,setUsers] = useState([]);
    const [joinedcall,setJoinedCall]=useState(false);
    const peersRef = useRef([]);
    const myRef = useRef(null);
    useEffect(()=>{
            let i;
            socket.on("me",sid=>i=sid)
             navigator.mediaDevices.getUserMedia({video:true,audio:true})
             .then(st=>{console.log(st);setMe({id:i,name:"test",stream:st});myRef.current.srcObject=st
            })
            socket.on("gettingcall",data=>{
                console.log("getting call from"+data.from)
                const peer = addPeer(me.id,data.from,me.stream,data.signal);
                const newData={
                    id:data.from,
                    name:data.name,
                    peer:peer
                }
                setUsers(prev=>[...prev,newData])
            })
            socket.on("ack",data=>{
                console.log("returning data signal from ");
                console.log(data.from)
                const userpeer = peersRef.current.find(user=> user.id===data.from).peer;
                console.log(+userpeer)
                userpeer.signal(data.signal)
            })

        },[])
        

    
    const joincall = ()=>{
        console.log("join call");
        socket.emit("joincall",{name:me.name,id:me.id});
        socket.on("getUsers",addusers=>{
            let us=[];
            addusers.forEach(user=>{
                const peer = createpeer(me.id,user.id,me.stream);
                us.push({
                    id:user.id,
                    name:user.name,
                    peer:peer
                })
                peersRef.current.push({
                    id:user.id,
                    peer:peer
                })
            })
            setUsers(us);
        })
        setJoinedCall(true);
        
    }
    useEffect(()=>{
        console.log("users are "+users)

    },[users])

    const createpeer=(from,to,st)=>{
        const peer = new Peer({
                initiator:true,
                trickle:false,
                stream:st
        })
        peer.on("signal",data=>{
            socket.emit("calluser",{signal:data,from:from,to:to,name:me.name})
        })
        return peer;
    }

    const addPeer = (from,to,stream,signal)=>{
        const peer = new Peer({
            initiator:false,
            trickle:false,
            stream:stream
        })
        peer.on("signal",data=>{
            socket.emit("acceptingcall",{to:to,signal:data,from:from})
        })
        peer.signal(signal);
        return peer;
    }
        return ( 
            <div className="videocomp">
                <div className="head">
                    Zoom Clone
                </div>
                <div className="videogrp">
                    <div className="vi" >
                        <li>{me.name}</li>
                        <video  ref={myRef} controls autoPlay={true}   muted  />
                    </div>

                  {
                      users.map((u,ui)=>(
                                <Video u={u} key={ui} />
                            ))
                        }
                       
                       
    
                </div>
                {
                        receivedcall&&
                    <div className="received">
                            <li>Receiving call from {"username"}</li>
                            <div className="butts">
                                <button onClick={e=>console.log("accept")} >Answer</button>
                                <button onClick={e=>console.log("reject")}>Reject</button>
                            </div>
                    </div>
                }
              {  !joinedcall&& <div className="join">
                    <div className="name">
                       <li>Name</li>
                       <input type="text" value={me.name} onChange={e=>setMe({...me,name:e.target.value})} />
                    </div>         
                    <div className="butt">
                        <button onClick={joincall} >Join call</button>
                    </div>         
                </div>}
            </div>
         );
}

const Video = ({u}) => {
    const streamRef = useRef(null);
    useEffect(()=>{
        u.peer.on("stream",st=>{

            streamRef.current.srcObject=st;
            console.log(st)
        })
    },[])
    return ( 
        <div className="vid"  >
                <li>{u.name}</li>
                <video  ref={streamRef} autoPlay={true}   muted  />
        </div>
     );
}
 
 
export default CGV;