
import { useEffect,useRef,useState } from "react";
import { useHistory } from "react-router";
import io from "socket.io-client"

let socket;
const ChatPage = ({det}) => {
   const chatRef = useRef(null);
   const saveRef = useRef(null);

   const [users,setUsers]=useState([]);
   const [msgs,setmsgs]=useState([])
   
 function getTime(){
   const date = new Date()
   var hours = date.getHours();
   var minutes = date.getMinutes();
   var ampm = hours >= 12 ? 'pm' : 'am';
   hours = hours % 12;
   hours = hours ? hours : 12; // the hour '0' should be '12'
   minutes = minutes < 10 ? '0'+minutes : minutes;
   var strTime = hours + ':' + minutes + ' ' + ampm;
   return strTime;
 }
   useEffect(()=>{
     socket  = io("http://localhost:5600");
   
      socket.emit('jr',det)
      socket.on('msg',(msg)=>{
        console.log(msg);
        setmsgs(arr=>[...arr,msg])
     })
     socket.on('chat-msg',(msg)=>{
      console.log(msg);
      setmsgs(arr=>[...arr,msg])
   })
   socket.on("roomusers",(data)=>{
         setUsers(data)
   })
     return ()=>socket.disconnect()
   },[det])
   const [msg,setMsg] =useState("")
   const sendmsg = ()=>{
      if(msg.length>0)
      {
         console.log("msg to be send",msg);
         let formsg = {
            user:det.user,
            text:msg,
            time:getTime()
         }
         setmsgs(arr=>[...arr,formsg])
         socket.emit("chat-msg",formsg);
         setMsg("")
      }
      else{
         console.log("no msg")
      }
   }
   useEffect(()=>{
       console.log(chatRef.current);
       chatRef.current.scrollTo({top:chatRef.current.scrollHeight,left:0,behaviour:"smooth"})
   },[msgs])
   const getClass = (i)=>{
    return  i===det.user?"msg ri":"msg le"
   }

   const handleSave = ()=>{
         const data=JSON.stringify(msgs,null,2);
         const blob = new Blob([data],{type:"application/json"});
         saveRef.current.href=URL.createObjectURL(blob);
         saveRef.current.setAttribute("download",det.room+" room.json")
   }

   const history = useHistory()
    return ( 
        <div className="chatpage">
               <div className="head">
                  <div className="title">ChatCord <span onClick={handleSave} > <a ref={saveRef} style={{textDecoration:"none",color:"white"}} href="http://">Save</a> </span> </div>
                  <button onClick={()=>history.push("/")} >Leave Room</button>
               </div>
               <div className="body">
                     <div className="left">
                           <div className="room">
                                 <li style={{fontSize:"20px"}} >RoomName : </li>
                                 <li className="rm" >{det.room||"room"}</li>
                           </div>
                            <div className="users">
                                 <li>Users</li>
                                 <div className="use">
                                       {users.map((el,eli)=>{
                                       return <li key={eli} >{el===det.user?"me":el}</li>
                                       })}
                                 </div>
                              </div>
                     </div>
                     <div className="r" ref={chatRef} >
                           {msgs.map((el,eli)=>{
                              return <div className={getClass(el.user)} key={eli} >
                                          <div className="t">{el.user===det.user?"me":el.user+" "} <span>{el.time}</span></div>
                                          <div className="b">{el.text}</div>
                                       </div>
                           })}
                     </div>
               </div>
               <div className="foot">
                      <input type="text" placeholder="Enter Message" value={msg} onChange={e=>setMsg(e.target.value)} />
                      <button onClick={sendmsg} >Send</button>
               </div>
        </div>
     );
}
 
export default ChatPage;