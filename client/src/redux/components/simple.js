import { useEffect } from "react";
import store  from "../store";



const ReduxTut = () => {
  
    useEffect(()=>{
        store.dispatch({
            type:"bugAdded",
            payload:{
                description:"bug1"
            }
        })
      
     
    },[])
    return ( 
        <div className="tut">
                this is redux tutorial
               { store.map(item=>{
                    
                })}
        </div>
     );
}
 
export default ReduxTut;
