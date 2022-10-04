import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import ReduxTut from './redux/components/simple';

import UnauthAccsess from './componenets/privateaccess.component';
import Mason from "./componenets/massonrylayout.component"
import GV from './componenets/gv.component';

{/*
import Anim from "./componenets/framer.component"
import Tl from "./componenets/keyframer.component";
import Beg from "./componenets/beggings.component"
import FmMenu from "./componenets/fmmenu.component";
import Dnd from './componenets/dnd.component';
import Chat from './componenets/chat.component';
import ChatPage from './componenets/chatpage.component';
import Draw from './componenets/drawing.component';
import VideoChat from './componenets/videochat.component';
import CGV from "./componenets/copyofgv.component"

*/}

const ProtectedRoute = ({ component: Component, li, ud, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        return li ? <Component det={ud} /> : <UnauthAccsess />
      }
    } />
  );
}


function App() {

  const [loggedin, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    "user": "",
    "room": ""
  })

  return (
    <div className="app">
      <Router>
        <Switch>
          { /* <Route path="/lt" component={Tl}></Route>
    <Route path="/beg" component={Beg} ></Route>
    <Route path="/m" component={FmMenu} ></Route>
    <Route path="/fd" component={Anim} ></Route>
    <Route path="/dnd" component={Dnd} ></Route>
    <Route exact path="/chat"><Chat cud={(...data)=>setUserData({user:data[0],room:data[1]})}  si={(val)=>setLoggedIn(val)} /></Route>
    <ProtectedRoute path="/page" component={ChatPage} ud={userData} li={loggedin}/>
    <Route path="/draw" component={Draw} ></Route>
              <Route path="/cgv" component={CGV} ></Route>

 */}
          <Route path="/gv" component={GV} ></Route>
          <Route exact path="/" component={ReduxTut} ></Route>
          <Route path="/mason" component={Mason} ></Route>

          <Route path="/*" component={Notfound} ></Route>
        </Switch>
      </Router>
    </div>
  );
}

const Notfound = () => {
  return (
    <div className="not_found">
      404 not found
    </div>
  );
}




export default App;
