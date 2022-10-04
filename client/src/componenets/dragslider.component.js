import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Fds = () => {

    const [s,ss]=useState(false);
    const x = useSpring(0,{stiffness:300,damping:200});
    const width=useTransform(x,[-1980,0],[0,1020]);
    const scale=useTransform(x,[-100,0],[1.25,1]);
    const fadeIn=useTransform(x,[-100,0],[0.25,1]);
    const font=useTransform(x,[-200,0],[30,16]);

    const numRef=useRef(null);
    const arr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    useEffect(()=>{
        numRef.current.style.setProperty('--num',arr.length);
        document.querySelector(".ds").addEventListener("dblclick",()=>{
            if(()=>s)
            {
                x.stop();
                x.set(0);
            }
            else{
             console.log("hello",s)
            }
            
        })
    },[])
    useEffect(()=>{
          
            x.onChange(()=>{
                x.get()>-50?ss(false):ss(true);
            })
    },[x])
    return ( 
       
        <motion.div className="slider"  >
        <motion.div className="con" style={{opacity:fadeIn,fontSize:font}}>allow animation :  {s.toString()}</motion.div>
        <div className="inner">
        <motion.div drag={"x"} style={{x,scale}} dragConstraints={{right:0,left:-1980}} dragElastic={0.3} className="sinner" ref={numRef} >
                {
                    arr.map(el=>(
                         <div className="lis" key={el} >{el}</div>
                    ))
                }
        </motion.div>
        
        </div>
        <motion.div style={{width}} className="prog"></motion.div>
        </motion.div>
     );
}
 
export default Fds;