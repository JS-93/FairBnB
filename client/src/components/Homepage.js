import React from "react"
import { Link } from 'react-router-dom'




const Homepage = ( { user }) => {
    
   
    return(
            <div className='homepagebackground'>
            <div className='homepage'>
                <h1>Welcome to FairBnB {user.username}!</h1>
                <p>Your go-to website for cheap and accessible vacation rentals!</p>
                <p>Check out the full list of our rentals clicking <Link to='/seerentals'>HERE</Link></p>
            </div></div>
           
    )
}


export default Homepage



