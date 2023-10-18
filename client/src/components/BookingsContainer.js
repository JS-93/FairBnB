import React, { useEffect, useState } from "react";
import BookingCard from "./BookingsCard";


const BookingContainer = ({ userBookings, setBookings }) => {
    const [rentals, setRentals] = useState([])
    
    useEffect(() => {
        const rentalIds = userBookings.map(booking => booking.rental_id)

        fetch('/rentals')
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`HTTP error! Status ${resp.status}`)
            }
            return resp.json()
        })
        .then(rentals => {
            const filteredRentals = rentals.filter(rental => rentalIds.includes(rental.id))
            setRentals(filteredRentals)

            
        })
        .catch(e => console.error(e))
    }, [userBookings])

    console.log(userBookings)

    const bookingCards = rentals.map(rental => {
        const booking = userBookings.find(booking => booking.rental_id === rental.id);
        const startDate = booking ? booking.start_date : null;
        const endDate = booking ? booking.end_date : null;

        return <BookingCard
                key={rental.id}
                rental={rental}
                userBookings={userBookings}
                name={rental.name}
                location={rental.location}
                image={rental.image}
                startDate={startDate}
                endDate={endDate}
                setBookings={setBookings}
        />
    })
    return (<div>
        <ul>
            <li>{bookingCards}</li>
        </ul>
    </div>)
}


export default BookingContainer
