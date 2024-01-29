import React, { useState, useEffect } from "react";
import BookingContainer from "./BookingsContainer";

const Bookings = ( { user }) => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        fetch('/bookings')
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`HTTP error! Status ${resp.status}`)
            }
            return resp.json();
        })
        .then(books => {
            setBookings(books);
            
        })
        .catch(e => console.error(e))
    }, [])

    

    const userBookings = Array.isArray(bookings) ? bookings.filter((book) => book.user_id === user.id) : [];
    
   
    return (<div className='bookingsbackground'>
    <BookingContainer userBookings={userBookings} setBookings={setBookings}/>
    </div>)
}


export default Bookings
