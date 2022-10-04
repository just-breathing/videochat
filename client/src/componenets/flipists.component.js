import { useEffect, useRef, useState } from "react";
import { ReactComponent as Edit }  from "./svgs/edit.svg";
import {motion,AnimatePresence} from "framer-motion"
const Fliplists = () => {

    const labRef = useRef(null);

    const getDate = ()=>{const dat = new Date();return dat.getDate()+'-'+(dat.getMonth()+1)+'-'+dat.getFullYear()}
   const getTime=()=> {
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
      
    const [data,setData]=useState([
    {
        "id":1,
        "taskname":"cleaning dishes",
        "datecreated":getDate(),
        "tc":getTime(),
        "status":"created",
    },
    {
        "id":2,
        "taskname":"rinsisng clothes",
        "datecreated":getDate(),
        "tc":getTime(),
        "status":"goingon",
    }
])
const [nid,setNid]=useState(data[data.length-1].id+1);

console.log(nid)

const arr=["created","started","goingon","completed"];
const ni = ()=> nid;
const [newData,setNewData]=useState({
    "id":ni(),
    "taskname":"",
    "datecreated":getDate(),
    "tc":getTime(),
    "status":"",
})

const handleChange = (e)=>{
    if(e.target.value.length>=1) 
    {
         e.target.classList.add("valid");
         console.log("valid");
    }
    else
    {
        e.target.classList.remove("valid");
        console.log("not valid");
    }
    setNewData({...newData,taskname:e.target.value})
   
}

const handleAdd = (e)=>{
        e.preventDefault();
        console.log("add");
        setData((prevData)=>[...prevData,newData]);
        setNid(nid=>nid+1);
}
const drop = (e,cl)=>{
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    console.log("id of drag element"+id);
    const item = document.getElementById(id);
    console.log(item)
    item.style.display="grid";
    e.target.appendChild(item);
}
const dragOver = e=>{
    e.preventDefault();
    console.log("dragover")
}

useEffect(()=>{
    setNid(data[data.length-1].id+1);  
    setNewData({...newData,id:nid})
},[data])

     return (
         <div className="listcont">
                <div className="conts">
                    {arr.map(el=>(
                        <Div cl={el} sd={setData} dragover={dragOver} drop={drop} arr={el==="created"?data:data.filter((ele)=>ele.status===el)} />
                    ))}
                        
                </div>
                <div className="addtodo">
                    <div className="c">
                    <input type="text" style={{zIndex:10}}  onChange={(e)=>handleChange(e)} />
                    <label ref={labRef} >enter todo</label>
                       
                    </div>
                    <select onChange={(e)=>setNewData({...newData,status:e.target.value})}>
                            {arr.map(el=><option value={el}>{el}</option>)}
                     </select>
                    <button onClick={handleAdd} >Add todo</button>
                </div>
        </div>
     );
}

const Div = ({cl,arr,sd,drop,dragover}) => {

    const scrollRef = useRef(null);

    const [issorted,setIsSorted]=useState(false);
    const handleSort = (e)=>{
            setIsSorted((prev)=>!prev)
    }
    const sort= (a,b)=>
    {
        return a.taskname.localeCompare(b.taskname)
       
    }

    const parVAriants = {
        initial:{
            opacity:0,
            scale:0
        },
        animate:{
            opacity:1,
            scale:1,
            transition:{
                when:"beforeChildren",
                staggerChildren:.2
            }
        },
        exit:{
            opacity:0,
            scale:0
        }
    }
    const chVariants = {
        initial:{
            scale:0,
            opacity:0
        },
        animate:{
            scale:1,
            opacity:1
        },
        exit:{
            scale:0,
            opacity:0
        }
    }
    useEffect(()=>{
          setTimeout(()=>{
            scrollRef.current.scrollTo({top:scrollRef.current.scrollHeight,behaviour:"smooth"});
          },90)  
    },[])




const dragStart = e=>{
    e.preventDefault()
    console.log("drag start")

    const target = e.target;
    target.classList.add("dragging");
    console.log(target)
    e.dataTransfer.setData("id",target.id);
  
}

const DragEnd = e=>{
    console.log("dragEnd");
    e.target.classList.remove("dragging")
    console.log(e.target)
}
    return (  
            <div className={`cons ${cl}`}  key={cl} onDoubleClick={handleSort} >
                    <div className="head">{cl==="created"?"All Tasks":cl}</div>
                    <div className="toti" key={cl+"i"} onDragOver={e=>dragover}  onDrop={e=>drop(e,cl)} ref={scrollRef} >
                    {arr.length>0 &&( issorted?[...arr].sort(sort):arr).map(el=>
                
                            <div className="i" id={cl==="created"?"null":el.id} onDragEnd={DragEnd} onDragStart={dragStart}   draggable={cl==="created"?"false":"true"}  >
                            
                                <div className="column">
                                            <div>{el.taskname} </div> 
                                            <button>Edit</button>
                                    </div>
                                    <div className="column">
                                                 <div>{el.datecreated +" "+el.tc}</div>
                                                <button>Delete</button>
                                    </div>
                                  
                            </div>
                        )}
                        </div>
            </div> 
        );
}
 

 
export default Fliplists;