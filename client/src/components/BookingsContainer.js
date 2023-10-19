import React, { useEffect, useState } from "react";
import BookingCard from "./BookingsCard";


const BookingContainer = ({ userBookings, setBookings }) => {
    const [rentals, setRentals] = useState([])
    
    useEffect(() => {
        

        fetch('/rentals')
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`HTTP error! Status ${resp.status}`)
            }
            return resp.json()
        })
        .then(data => {
            setRentals(data)
            
            
        })
        .catch(e => console.error(e))
    }, [])

   

    const bookingCards = userBookings.map(booking => {
        const rental = rentals.find(r => r.id === booking.rental_id);

        if (!rental) return null;

        return (<li key={booking.id}><BookingCard
                key={rental.id}
                rental={rental}
                userBookings={userBookings}
                name={rental.name}
                location={rental.location}
                image={rental.image}
                setBookings={setBookings}
                startDate={booking.start_date}
                endDate={booking.end_date}
        /></li>)
    })
    return (<div>
        <ul>
            {bookingCards}
        </ul>
    </div>)
}


export default BookingContainer
