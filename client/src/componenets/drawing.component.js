import { useEffect, useRef, useState } from "react";

const Draw = () => {
  
    const colors=["red","green","yellow","blue"];
    const canRef = useRef(null);
    const contextRef = useRef(null);
    useEffect(()=>{
    const canvas = canRef.current;
    canvas.style.backgroundColor="white"
    const  context = canvas.getContext('2d');
    context.lineCap="round"
    context.strokeStyle="black"
    context.lineWidth=2
    contextRef.current=context;
    },[])
const [drawing,setIsdrawing] = useState(false);

const startDrawing = (e)=>{
    const {offsetX,offsetY} = e.nativeEvent;
    const rect=canRef.current.getBoundingClientRect()
    console.log("started drawing"+offsetX)
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX-rect.left,offsetY-rect.top);
    setIsdrawing(true)
}

const finishDrawing =() =>{
    console.log("finish drawing")
    contextRef.current.closePath()
    setIsdrawing(false)
}
const draws = (e) =>{
    const {offsetX,offsetY} = e.nativeEvent;
    const rect=canRef.current.getBoundingClientRect()

    console.log("drawing")
    if(drawing)
    {
        contextRef.current.lineTo(offsetX-rect.left,offsetY-rect.top);
        contextRef.current.stroke()
    }
    else{
        return
    }
}

    return ( 
        <div className="draw">
                <canvas id="canvas" ref={canRef}  onMouseDown={startDrawing} onMouseUp={finishDrawing}  onMouseMove={drawing?draws:null}></canvas>
                <div className="tools">
                    <button className="und">Undo</button>
                    <button className="clear">Clear</button>
                   
                            {colors.map((el,eli)=>(
                                <div className="colorfield" key={eli} style={{backgroundColor:el}}></div>
                            ))}
                    <input type="color" className="colorpicker"/>
                    <input type="range" className="range" min="1" max="30" />
                </div>
        </div>
     );
}
 
export default Draw;