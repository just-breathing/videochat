import React, { useEffect, useState } from "react";

const Cal = () => {
    const [cal,showCal]=useState(false);
    const [selected,isSelected]=useState("years");
    const daynames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months=["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];
    const days=(size,start=1)=>( [...Array(size).keys()].map(i => i + start));
    const dat=new Date();
    const [date,setDate]=useState(
        {
            "current":{
                "day":dat.getDate(),
                "month":months[dat.getMonth()],
                "year":dat.getFullYear()
            },
            "selected":{
                "day":dat.getDate(),
                "month":months[dat.getMonth()],
                "year":dat.getFullYear()
            }
            
        }
    )
    const getClass = (x)=>{
            return selected===x?`div selected`:x;
    }
    return ( 
        <div className="cal">
            <div className="date">
                <p>date : <span className="bu" onClick={()=>showCal(true)}> {date.selected.day+"/"+date.selected.month+"/"+date.selected.year}</span></p>
            </div>
          { cal && <div className="inner">
                <div className="cal-header">
                    <div className={getClass('days')} onClick={()=>isSelected("days")} >day : {date.selected.day}</div>
                    <div className={getClass('months')} onClick={()=>isSelected("months")} >month : {date.selected.month}</div>
                    <div className={getClass('years')} onClick={()=>isSelected("years")} >year : {date.selected.year}</div>
                    <div className="cl" onClick={()=>showCal(false)}>X</div>
                </div>
                <div className={`cal-inner-${selected}`}>
                  {
                      selected==="days"? 
                      <Day daynames={daynames} dt={date} sd={setDate} />:
                      (selected==="months"?<Month  dt={date} sd={setDate} />:
                      <Year dt={date} sd={setDate} />)
                  } 
                 </div>
            </div>}
        </div> );
}
const Day = ({daynames,dt,sd}) => {

    const days=(size,sdn,start=1)=>{ 
      const arr =   [...Array(sdn).keys()].map(i => " ")
      const arr1 =arr.concat([...Array(size).keys()].map(i => i + start))
      console.log(arr1)
        return arr1;
    };
    const months=["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];
    const dat = (y,x)=>{
        console.log(months.indexOf(dt.selected.month)+y+" "+dt.selected.year)
        return new Date(dt.selected.year,months.indexOf(dt.selected.month)+y,x)
    }
    const getDays = ()=>{
        let noofdays = dat(1,0).getDate();
        let startdayname=dat(0,1).getDay();
        console.log("no of days in "+dt.selected.month+" in "+dt.selected.year+" is "+noofdays+" and starting day is "+startdayname);
        return days(noofdays,startdayname)
    }
    const [Days,setDays]=useState(getDays())
    const getClass = (x)=>{
        return  (x===dt.current.day && dt.selected.year===dt.current.year && dt.selected.month===dt.current.month)?"current":(x===dt.selected.day?"select":"day")
     }

    return (  
        <React.Fragment>
                <div className="dname">
                        {daynames.map(el=><li key={el} >{el}</li>)}
                </div>
                <div className="days">{Array.from(Days).map(el=><li key={el} value={el} onClick={(e)=>{
                    sd((ps)=>({...ps,selected:{...ps.selected,day:e.target.value}}));
                   
                    } } className={getClass(el)} >{el}</li>)}</div>
        </React.Fragment>
    );
}
 
const Month = ({dt,sd}) => {
    const months=["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];

const getClass = (x)=>{
    return (x===dt.current.month && dt.selected.year===dt.current.year)?"current":(x===dt.selected.month?"select":"month")
}
    return ( 
        <React.Fragment>
            {Array.from(months).map(el=>(<li key={el} value={el} onClick={(e)=>{
                sd((ps)=>({...ps,selected:{...ps.selected,month:el}}))
                
                }}
                  className={getClass(el)}>{el}</li>))}
        </React.Fragment>
         );
}
 
const Year = ({dt,sd}) => {
    const dat = new Date();
    const endYear=dat.getFullYear();
    const [curendyear,setCurendyear]=useState(endYear);
    const firstYear=curendyear-20+1;
    const getYears=(fy)=>{
      return  [...Array(20).keys()].map(i => i + fy)
    }
    const [years,setYears]=useState(getYears(firstYear));
    const handlePrev = ()=>{
        setCurendyear((year=>year-20));
    }
    const handleNext = ()=>{
        setCurendyear((year=>year+20));
    }
    useEffect(()=>{
            setYears(getYears(firstYear))
    },[curendyear])

 
    const getClass = (x)=>{
        return x===dt.current.year?"current":(x===dt.selected.year?"select":"year")
     }
    return ( 
        <div className="years">
            <div className="controls">
                <div className="prev" onClick={()=>handlePrev()} >{"<"}</div>
                <div className="range">{firstYear+"-"+curendyear}</div>
                <div className="next" onClick={()=>handleNext()} >{">"}</div>
            </div>
            <div className="yearsinner">
               {years.map(el=><li key={el}  value={el} onClick={(e)=>{
                sd((ps)=>({...ps,selected:{...ps.selected,year:el}}))
                } } className={getClass(el)} >{el}</li>)}
            </div>
        </div>
         );
}
export default Cal;