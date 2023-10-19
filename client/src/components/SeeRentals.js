import React, { useState, useEffect } from "react";
import RentalsContainer from "./RentalsContainer";

const SeeRentals = ( { user }) => {
    const [rentals, setRentals] = useState([])

    useEffect(() => {
        fetch('/rentals')
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`HTTP error! Status ${resp.status}`)
            }
            return resp.json();
        })
        .then(rentals => {
            setRentals(rentals)
            
        })
        .catch(e => console.error(e))
    }, [])


    return (<div className='cardbackground'>
        <h1>Hello from Rentals!</h1>
        <RentalsContainer user={user} rentals={rentals}/>
    </div>)
}


export default SeeRentals
