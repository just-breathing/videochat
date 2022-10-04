import { useEffect, useRef, useState } from "react";

const Dd = () => {
    const [img,setImg] = useState(null);
    const dropRef = useRef(null);
  
  useEffect(()=>{
      dropRef.current.addEventListener("drop",(e)=>{
          e.preventDefault();
          e.stopPropagation();
          console.log("dropped");
          setImg(URL.createObjectURL(e.dataTransfer.files[0]))
      })
      dropRef.current.addEventListener("dragover",(e)=>{
        e.preventDefault();
        e.stopPropagation();
        console.log("dragover");
    })
      dropRef.current.addEventListener("dragenter",(e)=>{
        e.preventDefault();
        e.stopPropagation();
        console.log("drag enter");
    })
    dropRef.current.addEventListener("dragleave",(e)=>{
        e.preventDefault();
        e.stopPropagation();
        console.log("drag leave");
    })

    
  },[])

    return ( 
        <div className="im">
            <div className="dd" >
                <div className="ddinner"  ref={dropRef} >
                    <input  type="file" id="fileupload" onChange={(e)=>setImg(URL.createObjectURL(e.target.files[0])) } />
                    <label htmlFor="fileupload" className="lab"  >
                         <p>drag and drop files to upload</p>
                        <p>or</p>
                        <p>click to upload file</p>
                     </label>
                </div>
            </div>
            <div className="preview">
                        <img src={img} alt=""/>
            </div>
    </div> 
    );
}
 
export default Dd;