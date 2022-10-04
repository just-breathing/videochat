import {useEffect, useRef, useState} from "react";
const LT = () => {

        
    const tlRef = useRef(null);
    const [type,setType]=useState("card");
    const contRef = useRef(null);
  const [data,setData] = useState([
    {
        "vari":"Productivity tips",
        "tags":["learning","notes"]
    },
    {
      "vari":"Professional Women",
      "tags":["Success","CArrer"]
    },
    {
        "vari":"Professional Women",
        "tags":["Success","CArrer"]
      },
      {
        "vari":"Productivity tips",
        "tags":["learning","notes"]
    },
    {
        "vari":"Professional Women",
        "tags":["Success","CArrer"]
      },    
      {
        "vari":"Productivity tips",
        "tags":["learning","notes"]
    },
    {
      "vari":"Professional Women",
      "tags":["Success","CArrer"]
    },
    {
        "vari":"Professional Women",
        "tags":["Success","CArrer"]
      },
      {
        "vari":"Productivity tips",
        "tags":["learning","notes"]
    },
    {
        "vari":"Professional Women",
        "tags":["Success","CArrer"]
      },    
  ]);

  const handleClick = () =>{
    let fRect=[];
    let lrect=[];
    let fcont=[];
    let lcont=[];
    let fpar=[];
    let lpar=[];
    let tl = document.querySelector(".tl");
    let pars=tl.querySelectorAll(".item");
    let imgs=tl.querySelectorAll(".img")
    let conts = tl.querySelectorAll(".data");
        //get First position
      fRect = getRect(imgs);
      fcont=getRect(conts);
      fpar=getRect(pars);
      tlRef.current.dataset.view=tlRef.current.dataset.view==="list"?"card":"list";
      console.log( tlRef.current.dataset.view);
      setType(tlRef.current.dataset.view);

      //get last position
     lrect = getRect(imgs);
     lcont=getRect(conts);
     lpar=getRect(pars);
     console.log(fpar,lpar);

     //invert
    tlRef.current.dataset.flip=true;
    invert(pars,fpar,lpar);
        //invert(imgs,fRect,lrect);
        //invert(conts,fcont,lcont);
     //play
     /*
     
    setTimeout(()=>{
        play(imgs,fRect,lrect);
        play(conts,fcont,lcont);
    },100)*/
  }

  const invert = (container,fr,lr)=>{
    container.forEach((el,i)=>{
        el.style.transition="all 20s"
        let sx = lr[i].width/fr[i].width;
        let sy= lr[i].height/fr[i].height;
        let tx= (lr[i].x)-fr[i].x;
        let ty= (lr[i].y)-fr[i].y;
        console.log(sx,sy,tx,ty);
       // el.style.setProperty("--sx",1/sx);
       // el.style.setProperty("--sy",1/sy);
        el.style.setProperty("--tx",tx);
        el.style.setProperty("--ty",ty);
    })
  }
  const play = (container,fr,lr)=>{
    container.forEach((el,i)=>{
        el.style.transition="all 3s"
        let sx = lr[i].height/fr[i].width;
        let sy= lr[i].height/fr[i].height;
        el.style.setProperty("--sx",sx);
        el.style.setProperty("--sy",sy);
        el.style.setProperty("--tx",0);
        el.style.setProperty("--ty",0);
    })
  }
  const getRect = (x)=>{
      console.log(x);
      return Array.from(x).map(el=>el.getBoundingClientRect())
  }

  useEffect(()=>{
      
  },[data])

    return ( 
        <div className={`cont`}>
        <div className="button">
        <button onClick={()=>handleClick()}>{type}</button>
        </div>
       
        <div className="tl" data-view="card" ref={tlRef}>
                {data.map((item,i)=>(<div className="item" key={i} >
                                    <div className="img">{i}</div>
                                    <div className="data" ref={contRef}>
                                            <div className="head">
                                                {item.vari}
                                            </div>
                                            <div className="tags">
                                                   { item.tags.map((it,i)=>(<li  key={i} >{it}</li>))}
                                            </div>
                                    </div>
                                  </div>))}
        </div> 
        </div> 
    );
}
 
export default LT;