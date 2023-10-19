import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Homepage from "./Homepage";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Bookings from "./Bookings";
import Logout from "./Logout";
import SeeRentals from "./SeeRentals";
import AddRental from "./AddRental";
import UpdateDelete from "./UpdateDelete";


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
     
    })
    .catch(e => console.error(e))
  }, [])

  const handleLogout = () => {
    fetch('/logout')
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`HTTP error! Status ${resp.status}`)
      }
      return resp.json() 
    })
    .then(() => {
      setCurrentUser(null)
    })
  }

// retrieves user data right after a login
  const handleLogin = (response) => {
    if (response.message === 'Logged in successfully.') {
      
      fetch('/check_session')
      .then(resp => resp.json())
      .then(user => setCurrentUser(user));
    }
  }

  const handleUpdate = (response) => {
    if (response.message === 'Updated successfully!') {
      fetch('/check_session')
      .then(resp => resp.json())
      .then(user => setCurrentUser(user))
    }
  }

  const handleDelete = () => {
    setCurrentUser(null)
  }
  

 
  return (
    
      <>
      <Navbar/>
      <Switch>
        <Route exact path="/login">
        {currentUser ? <Redirect to="/homepage" /> : <Login onLogin={handleLogin} />}
        </Route>
        <Route exact path="/homepage">
        {!currentUser ? <Redirect to="/login" /> : <Homepage user={currentUser} />}
        </Route>
        <Route exact path="/signup">
        {!currentUser ? <Signup/> : <Redirect to= '/homepage'/>}
        </Route>
        <Route exact path='/bookings'>
        {!currentUser ? <Redirect to='/login'/> : <Bookings user={currentUser}/>}
        </Route>
        <Route exact path="/seerentals">
        {!currentUser ? <Redirect to='/login'/> : <SeeRentals user={currentUser}/>}
        </Route>
        <Route exact path="/addrental">
        {!currentUser ? <Redirect to='/login'/> : <AddRental/>}
        </Route>
        <Route exact path="/updatedelete">
        {!currentUser ? <Redirect to='/login'/> : <UpdateDelete user={currentUser} onUpdate={handleUpdate} onDelete={handleDelete}/> }
        </Route>
        <Route exact path='/logout'>
        {!currentUser ? <Redirect to='/login' /> : <Logout onLogout={handleLogout}/>}
        </Route>
        <Redirect to="/login" />
      </Switch>
      </>
   
  );
}

export default App;
