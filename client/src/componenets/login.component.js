import { useState } from "react";

const Login = ({li,sli,sd}) => {

    const [data,setData]=useState({
        "username":"",
        "room":""
    })

    const handleClick = (e) =>{
            e.preventDefault();
            console.log(data);
            if(data.username.length>0)
            {
             sli(true);
             sd({user:data.username,room:data.room});
            }
    }
    return ( 
        <div className="login">
            <div className="loginbody">
                    <div className="header">
                        swichat
                    </div>
                    <div className="form">
                        <div className="name">
                            <label>Username</label>
                            <input type="text" placeholder="enter username  ...." onChange={(e)=>setData({...data,username:e.target.value})}/>
                        </div>
                        <div className="name">
                            <label>Room</label>
                            <select onChange={(e)=>setData({...data,room:e.target.value})}>
                                <option>Select room ... </option>
                                <option  value = "js" >Js</option>
                                <option value="php">PHP</option>
                                <option value="Java" >Java</option>
                                <option value= "sql" >Sql</option>
                            </select>
                        </div>
                        <button className="but" onClick={(e)=>handleClick(e)} >
                            Join Chat
                        </button>
                    </div>
            </div>
        </div>
     );
}
 
export default Login;