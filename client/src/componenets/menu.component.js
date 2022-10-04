import { useEffect, useRef, useState } from "react";
import {Link} from"react-router-dom";
const Menu = () => {
    const menuRef = useRef(null);
    const navRef=useRef(null);
    const [active,setActive] = useState("notactive");
    useEffect(()=>{
        navRef.current.addEventListener("click",()=>{
           
            changeMenu();
           
        })
        
        const changeMenu = ()=>{
            setActive(active==="notactive"?"active":"notactive")
            if(active!=="active")
            {
                navRef.current.classList.remove("active");
                menuRef.current.classList.remove("active");
            
            }
            else
            {
                navRef.current.classList.add("active");
                menuRef.current.classList.add("active");
            }
        }
    })
    return ( 
        <div>
        <div className="menu" ref={menuRef}>
            <ul>
                <li><Link to="/login" className="li">Login</Link></li>
                <li><Link to="/chat" className="li">Chat</Link></li>
                <li><Link to="/lt" className="li">List-Tile</Link></li>
            </ul>
        </div>
                <div className="nav" ref={navRef}>
                        <div className="inner">
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                        </div>
                </div>
        </div>
     );
}
 
export default Menu;