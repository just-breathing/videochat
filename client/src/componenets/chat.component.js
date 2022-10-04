import React, { useEffect,useState } from "react";
import { useHistory } from "react-router";

const Chat = ({cud,si}) => {
    const arr=["js","php","jsp","r"];
    const [userData,setUserData]=useState({
        "username":"",
        "room":arr[0]
    })
    const history = useHistory();
    useEffect(()=>{
        document.querySelector("body").style.backgroundColor="#e7e7f1"
    })

   const HandleJoin = ()=>{
    cud(userData.username,userData.room);
    si(true);
    history.push("/page");
   }

    return (
        
        <div className="joinroom">
            <div className="tit">Discord</div>
            <div className="conta">
                <div className="user">
                    <label> Username</label>
                    <input type="text"  placeholder="enter username ...."  onChange={e=>setUserData({...userData,username:e.target.value})} />
                </div>
                <div className="user">
                    <label> Room</label>
                    <select onChange={e=>setUserData({...userData,room:e.target.value})} >
                           {
                               arr.map((el,eli)=>{
                                   return <option value={el} key={eli} >{el}</option>
                               })
                           }
                    </select>
                </div>
                <button onClick={HandleJoin} >Join Chat</button>
            </div>
        </div>
      );
}
 
export default Chat;