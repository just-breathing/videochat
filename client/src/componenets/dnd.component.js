import React, { useState,useRef, useEffect } from "react";

const Dnd = () => {

const dndRef = useRef(null);

    const dat=[
        {
            "title":"created",
            "items":[]
        },
        {
            "title":"started",
            "items":["item1","item2","item3"]
        },
        {
            "title":"inprogress",
            "items":["item4","item5",]
        },
        {
            "title":"completed",
            "items":["item6"]
        }
    ]

    const [data,setData]=useState([]);
    const dragRef = useRef(null);
    const dragNode = useRef(null);
    const [dragging,setDragging] = useState(false);
    const handleDragStart = (e,params) =>{
            console.log("drag started....",params);
            dragRef.current=params;
            dragNode.current=e.target;
            setTimeout(()=>{
                setDragging(true);
            },10)
            dragNode.current.addEventListener('dragend',handleDragEnd);
    }
    const handleDragEnd = e =>{
        console.log("dragEnd ...");
        dragNode.current.removeEventListener('dragend',handleDragEnd);
        dragRef.current=null;
        dragNode.current=null;
        setDragging(false)
    }
  const getStyle = (params)=>{
        return (dragging && (dragRef.current.grpi===params.grpi && dragRef.current.itemi===params.itemi))?"ditem bitem":"bitem"
  }


const handleDragEnter = (e,params) =>{
    let currentItem = dragRef.current
    if(e.target!==dragNode.current)
    {
        console.log("dragged elelment is over element",params);
        setData(oldData=>{
            let newData = JSON.parse(JSON.stringify(oldData));
            newData[params.grpi].items.splice(params.itemi,0, newData[currentItem.grpi].items.splice(currentItem.itemi,1)[0])
            dragRef.current=params;
            return newData
        })
    }
    
}

    const saveData = () =>{
            localStorage.setItem("data",JSON.stringify(data));
            console.log("saved data")
    }
    useEffect(()=>{
        const d = JSON.parse(localStorage.getItem("data"))
        d===null?setData(dat):setData(d);


    },[])
    const [inData,setIndata] = useState(null);
    const handleChange = e =>{
        (e.target.value.length>0)?e.target.classList.add("valid"):e.target.classList.remove("valid");
        setIndata(e.target.value);
    }

    const handleAdd = e =>{
        const nd = inData;
        setData(oldData=>{
            let newData = JSON.parse(JSON.stringify(oldData));
            newData[0].items.push(nd);
            return newData
        })
    }
    useEffect(()=>{
        window.addEventListener('beforeunload', function (e) {
            saveData()
            e.preventDefault();
           
            e.returnValue = '';
            
        });
    })
    return ( 
        <div className="dnd" ref={dndRef} onun >
           <div className="button">
                <button onClick={saveData} >Save</button>
           </div>
        <div className="dnd-inner">
            {data.map((grp,grpi)=>(
                <div className="board" key={grpi} onDragEnter={(dragging && grp.items.length===0)?e=>handleDragEnter(e,{grpi,itemi:0}):null} >
                <div className="title">{grp.title}</div>
                        {grp.items.map((item,itemi)=>(
                            <div className={getStyle({grpi,itemi})} key={itemi} draggable onDragEnter={e=>handleDragEnter(e,{grpi,itemi})} onDragStart={e=>handleDragStart(e,{grpi,itemi})}>
                                    {item}
                            </div>
                        ))}
                </div>
            ))}
        </div>
                <div className="input">
                            <div className="input-inner">
                                <div className="inp">
                                    <input type="text" onChange={handleChange}/>
                                    <label >Todo</label>
                                </div>
                                <button onClick={handleAdd}>Add</button>
                            </div>
                </div>
        </div>
     );
}


 
 
export default Dnd;