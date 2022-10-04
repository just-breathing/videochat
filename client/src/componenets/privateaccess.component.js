import { Link } from "react-router-dom"

const UnauthAccsess = () => {
    return (    
        <div className="uaa">
            <p>error 404 unauthorised access</p>
            <p> <Link to="/" >Go ot login page</Link>   </p>
        </div>
      );
}
 
export default UnauthAccsess;