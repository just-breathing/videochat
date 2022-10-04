import {useState} from 'react';
import { AnimateSharedLayout, motion,AnimatePresence} from "framer-motion";
import Beg from "./beggings.component"
const FmMenu = () => {
    const [open,setisOpen] = useState(false);
    const height=window.innerHeight/2;
    const h=0;
    const variants={
        initial:{
            clipPath: `circle(${h * 2}px at 40px 40px)`,
            transition:{delay:.5}
        },
        animate:{
            clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        }
    }
    return ( 
        <div className="maine">
            <motion.div className="men">
                <motion.div className="bg" variants={variants} initial={false} animate={open?"animate":"initial"}></motion.div>
                <motion.nav  >
                        <Menubar toggle={()=>setisOpen(!open)} open={open} />
                        <MenuItems open={open} />
                 </motion.nav>
            </motion.div>
            <div className="sl"> <Sl/></div>
           <div className="s2"><Beg/></div>
           <div className="s3"><Ring/><s1/></div>
        </div>
         );
}
 
const Menubar = ({toggle,open}) => {
    return (
         <motion.div className="menuBar" onClick={()=>toggle()} >
                <Div style={{'--w':'100%'}} open={open} variants={{initial:{y:0,rotate:0},animate:{y:13,rotate:50}}}/>
                <Div  style={{"--w":"70%"}} open={open} variants={{initial:{x:0,opacity:1},animate:{x:100,opacity:0}}}/>
               <Div style={{"--w":open?"100%":"40%"}} open={open} variants={{initial:{y:0,rotate:0},animate:{y:-16,rotate:-50}}}/>
         </motion.div> 
        );
}


 const Div = ({open,style,variants}) => {
     return (    <motion.div className="row" style={style} variants={variants} initial={false} animate={open?"animate":"initial"} ></motion.div> );
 }
  

const MenuItems = ({open}) =>{
    const colors=['#cc0066','#00e64d','#000099','#e67300','#cc00ff','#666699'];
    const parvariants={
        initial:{transition:{staggerChildren:.08,staggerDirection:-1}},
        animate:{transition:{staggerChildren:.2}}
    }
    const chvariants={
        initial:{y:120,opacity:0},
        animate:{y:0,opacity:1},
        hover:{scale:1.2}
    }
    return(
        <motion.div className="items" variants={parvariants} initial={false} animate={open?"animate":"initial"}  >
                {colors.map(el=><Item col={el} open={open} variants={chvariants}  />)}
        </motion.div>
    );
}
 
const Item = ({col,variants,open}) => {
    return ( 
        <motion.div className="ite" style={{'--col':col}} variants={variants}  initial={false} animate={open?"animate":"initial"}  whileHover="hover" >
                <div className="img"></div>
                <div className="con"></div>
        </motion.div>
     );
}
const Sl = () => {
    const [big,setisBig]=useState(false);
    const cvars={
            initial:{opacity:0},
            animate:{opacity:1},
            hover:{scale:1.1}
    }
    const parvars={
            initial:{opacity:0},
            animate:{opacity:1,transition:{staggerChildren:.08,when:"beforeChildren"}},
            exit:{opacity:0}
    }
    return (
        <AnimateSharedLayout type="crossfade">
        <motion.div className="parsc" layout   >
     <AnimatePresence>
       {big?<Big click={()=>setisBig(!big)} vars={cvars} parvar={parvars} />:<Small click={()=>setisBig(!big)} vars={cvars} parvar={parvars} />}
       </AnimatePresence> 
        </motion.div> 
        </AnimateSharedLayout>
    );
}
 const Small = ({click,vars,parvar}) => {
     return ( 
         <motion.div className="conte"  onClick={click}  variants={parvar} initial="initial" animate="animate" exit="exit">
                 <Div1 cla="fwhh" vars={vars}/>
                 <Div1 cla="fwfh" vars={vars}/>
                 <Div1 cla="hwhh" vars={vars}/>
         </motion.div>
      );
 }
  
 const Big = ({click,vars,parvar}) => {
     return ( 
        <motion.div className="conte"  onClick={click} variants={parvar} initial="initial" animate="animate" exit="exit">
                <Div1 cla="fwhh" vars={vars}/>
                <Div1 cla="hwhh" vars={vars}/>
                <Div1 cla="fwfh" vars={vars}/>
                <Div1 cla="hwfh" vars={vars}/>
                <Div1 cla="hwhh" vars={vars}/>
                <Div1 cla="fwfh" vars={vars}/>
                <Div1 cla="fwhh" vars={vars}/>
        </motion.div>
      );
 }
  
const Div1 = ({cla,vars}) => {
    return (  <motion.div className={`conten ${cla}`} variants={vars} whileHover="hover" ></motion.div> );
}
 
 const Ring = () => {

    const colors=['#cc0066','#00e64d','#000099','#666699'];
     const [selected,setisSelected] = useState(colors[0]);
  
     return ( 
         <div className="ring">
         <AnimateSharedLayout>
            <div className="ringcon">
                    {colors.map(el=>( 
                        <div className="it">
                            <div className="colo" onClick={()=>setisSelected(el)} style={{backgroundColor:el}} ></div>
                                {
                                    (selected===el) && <motion.div className="co" layoutId="outline" animate={{transition:{type:"spring", stiffness: 100,
                                    damping: 10}}} style={{'--col':el}} ></motion.div>
                                }
                        </div>
                    ))}
            </div>
        </AnimateSharedLayout>
         </div>
      );
 }
  

export default FmMenu;