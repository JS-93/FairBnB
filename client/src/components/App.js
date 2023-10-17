import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Homepage from "./Homepage";
import Signup from "./Signup";

function App() {
  const [currentUser, setCurrentUser] = useState(null)
 

  useEffect(() => {
    fetch('/check_session')
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`HTTP error! Status ${resp.status}`)
      }
      return resp.json();
    })
    .then(user => {
      setCurrentUser(user);
      console.log(user)
    })
    .catch(e => console.error(e))
  }, [])

  const handleLogin = (user) => {
    setCurrentUser(user);

  }

 
  return (
    
    
      <Switch>
        <Route exact path="/login">
          {currentUser ? <Redirect to="/homepage" /> : <Login onLogin={handleLogin} />}
        </Route>
        <Route exact path="/homepage">
          {!currentUser ? <Redirect to="/login" /> : <Homepage user={currentUser} />}
        </Route>
        <Route exact path="/signup">
          <Signup/>
        </Route>
        <Redirect to="/login" />
      </Switch>
      
   
  );
}

export default App;
