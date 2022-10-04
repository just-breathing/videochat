import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
const socket = io("http://localhost:5800");
const GV = () => {
    const [sharevideo, setSharevideo] = useState(true);
    const [shareaudio, setShareaudio] = useState(false);
    const [sharescreen, setSharescreen] = useState(false);
    const [joinedcall, setJoinedCall] = useState(false);
    const [receivedcall, setReceivedcall] = useState(false);
    const [changed, setChanged] = useState(false);
    const [me, setMe] = useState({
        id: "",
        name: "",
    })
    const [stream, setStream] = useState(null);
    const [users, setUSers] = useState([]);
    const peeersRef = useRef([]);
    const myRef = useRef(null);

    const joincall = () => {
        socket.emit("joinroom", { id: me.id, name: me.name });
        socket.on("getUsers", Users => {
            let us = [];
            Users.forEach(user => {
                const peer = createPeer(me.id, user.id, stream, me.name);
                us.push({
                    id: user.id,
                    name: user.name,
                    peer: peer
                })
                peeersRef.current.push({
                    id: user.id,
                    peer: peer
                })
            })
            setUSers(us)
        })
        setJoinedCall(true);
        socket.on("gettingcall", data => {
            console.log("getting call")
            console.log(data)
            const peer = addPeer(data.to, data.from, data.signal);
            const newData = {
                id: data.from,
                name: data.name,
                peer: peer
            }
            peeersRef.current.push({ id: data.from, peer: peer })
            setUSers(prev => [...prev, newData])
        })

    }


    const createPeer = (from, to, st, name) => {
        console.log("stream" + st)
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: st
        })
        peer.on("signal", data => {
            socket.emit("calluser", { from, to, signal: data, name: name });
        })
        return peer;
    }
    const addPeer = (from, to, callsignal) => {
        console.log("add peer");
        console.log(stream)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", data => {
            socket.emit("acceptingcall", { to, from, signal: data });
            console.log("sendign signal")
        })
        peer.signal(callsignal);
        return peer;
    }

    useEffect(() => {

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
            .then(st => {
                setStream(st);
                console.log("st")
                myRef.current.srcObject = st
            })
    }, []);


    useEffect(() => {
        socket.on("me", id => { setMe({ id: id, name: "test" }) })



        socket.on("ack", data => {
            console.log('ack');
            console.log(data)
            const userpeer = peeersRef.current.find(user => user.id === data.from)
            console.log(userpeer)
            userpeer.peer.signal(data.signal)
        })
    }, [])

    const ma = (st) => {
        console.log(st);
        setShareaudio(audio => !audio)
        st.getAudioTracks().forEach(track => track.enabled = !track.enabled)
    }
    const mv = (st) => {
        setSharevideo(video => !video)
        st.getVideoTracks().forEach(track => track.enabled = !track.enabled)
    }
    const screenShare = (st) => {
        navigator.mediaDevices.getDisplayMedia({
            video: {
                cursor: "always"
            },
            audio: true
        })
            .then(screenShare => {
                console.log("screen share");
                peeersRef.current.forEach(peerRef => {
                    peerRef.peer.replaceTrack(st.getVideoTracks()[0], screenShare.getVideoTracks()[0], st)
                    myRef.current.srcObject = screenShare;
                })
                screenShare.getTracks()[0].onended = () => {
                    setSharescreen(prev => !prev)

                    peeersRef.current.forEach(peerRef => {
                        peerRef.peer.replaceTrack(screenShare.getVideoTracks()[0], st.getVideoTracks()[0], st)
                        myRef.current.srcObject = st;
                    })
                }
            }
            )
    }




    return (
        <div className="videocomp">
            <div className="head">
                Zoom Clone
            </div>
            <div className="videogrp">
                <div className="vi" >
                    <li>{me.name}</li>
                    <video ref={myRef} controls autoPlay={true} />
                </div>

                {
                    users.map((u, ui) => (
                        <Video u={u} key={ui} />
                    ))
                }



            </div>
            {
                receivedcall &&
                <div className="received">
                    <li>Receiving call from {"username"}</li>
                    <div className="butts">
                        <button onClick={e => console.log("accept")} >Answer</button>
                        <button onClick={e => console.log("reject")}>Reject</button>
                    </div>
                </div>
            }
            {!joinedcall && <div className="join">
                <div className="name">
                    <li>Name</li>
                    <input type="text" value={me.name} onChange={e => setMe({ ...me, name: e.target.value })} />
                </div>
                <div className="butt">
                    <button onClick={joincall} >Join call</button>
                </div>
            </div>}
            {
                <div className="controls">
                    <div className="left">
                        <button onClick={(e) => mv(stream)}>{!sharevideo ? "no video" : "video"}</button>
                        <button onClick={(e) => ma(stream)}>{!shareaudio ? "mute" : "unmute"}</button>
                    </div>
                    <div className="middle">
                        <button onClick={!sharescreen ? () => { screenShare(stream); setSharescreen(prev => !prev) } : null}>{sharescreen ? "stop share" : "Share screen"}</button>
                    </div>
                </div>
            }
        </div>
    );
}

const Video = ({ u }) => {
    const streamRef = useRef(null);
    useEffect(() => {
        u.peer.on("stream", st => {
            console.log("onstream")
            streamRef.current.srcObject = st;
            console.log(st)
        })
    }, [])
    return (
        <div className="vid"  >
            <li>{u.name}</li>
            <video ref={streamRef} autoPlay={true} muted />
        </div>
    );
}

export default GV;