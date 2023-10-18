import React from "react";
import { Link } from 'react-router-dom'


const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to='/homepage'>Home</Link></li>
                <li><Link to='/bookings'>My Bookings</Link></li>
                <li><Link to='/seerentals'>See Rentals</Link></li>
                <li><Link to='/addrental'>Add a Rental</Link></li>
                <li><Link to='/logout'>Logout</Link></li>
                
            </ul>
        </nav>
    )
}

export default Navbar
