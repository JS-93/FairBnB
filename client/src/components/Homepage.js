import React from "react"
import { Route, Switch } from 'react-router-dom'
import Navbar from "./Navbar"
import Bookings from "./Bookings"



const Homepage = ( { user }) => {
    

    return(<>
        <Navbar/>
        <Switch>
         <Route exact path='/homepage'>
            
        
            <div>
                <h1>Welcome to EZ_BNB!</h1>
                <p>Your go-to website for cheap and accessible vacation rentals!</p>
            </div>
            </Route>
        <Route exact path='/bookings' component={Bookings}/>
        <Bookings/>
        <Route/>         
        </Switch>
        </>
    )
}


export default Homepage



