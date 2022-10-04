import React, {useState } from 'react';
import {AnimateSharedLayout,AnimatePresence,motion} from "framer-motion"

const Item = ()=>{
  const [open,setOpen]=useState(false);
  const chVariants = {
    initial:{
      y:200,
      opacity:0
    },
    animate:{
      y:0,
      opacity:1,
      
    },
    hover:{
      scale:1.02,
      transition:{yoyo:Infinity}
    }
  }
  return(
      <motion.div layout className="item" onClick={()=>setOpen((open)=>!open)} variants={chVariants} whileHover="hover">
            <motion.div className="avatar" layout ></motion.div>
            <AnimatePresence>
            {open&& <Content open={open}  />}
            </AnimatePresence>
      </motion.div>
  );
}
const Beg = () => {

  const contVariants = {
    initial:{
      y:200,
      opacity:0
    },
    animate:{
      y:0,
      opacity:1,
      transition:{
        when:"beforeChildren",
        staggerChildren:.3
      },
    }
}

    return( 
      <motion.div className="main">
      <AnimateSharedLayout>
          <motion.div className="cont" layout variants={contVariants} initial="initial"  animate="animate" >
               {
              [0,1,2].map((el,i)=>(
                  <Item  key={i} />
                ))
               }
          </motion.div>
          </AnimateSharedLayout>
        </motion.div>
     );
}
 
const Content = ({open})=>{
 
  const Contvariants={
    initial:{y:120,opacity:0},
    animate:{y:0,opacity:1, transition:{when:"beforeChildren",staggerChildren:.3}},
    exit:{
      opacity:0,
      y:120,
      transition:{
        when:"afterChildren",
        staggerChildren:.3,
        staggerDirection:-1,
      }
  }
  }
const childVariants ={
  intial:{y:120,opacity:0},
  animate:{y:0,opacity:1},
  exit:{opacity:0,y:120,rotate:[0,12,24,36,48,60,72,84,96,108,120]}}

  return (
    <motion.div layout variants={Contvariants} initial="intial" animate="animate" exit="exit" className="content">
      {
        [0,1,2].map((el)=>( 
          <motion.div  variants={childVariants}  className="row"></motion.div>
        ))
      }  
      
    </motion.div>
  );
}

export default Beg;