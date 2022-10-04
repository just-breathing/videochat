const Mgl = () => {
    const arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    return ( 
        <div className="mc">
                <p>masonry layout</p>
                <div className="mcinner">
               { arr.map((el)=>{
                    return    <Img cl={el}/>
               })}
               </div>
         </div> 
    );
}
 
const Img = ({cl}) => {

    const classes=["fwfh","fw","fh","hw","hh","hwhh","fwhh","hwfh","nwnh"];
    const getClass = ()=>{
        var no = Math.floor(Math.random()*classes.length);
        return "ima "+classes[no];
    }

    return (
         <div className={getClass()} key={cl} >
                <img   src={`https://source.unsplash.com/collection/1051/${cl}`} alt="images from source.unsplash.com" ></img>
            </div> 
    );
}
 
export default Mgl;