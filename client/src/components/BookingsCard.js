import React, { useState } from "react";


const BookingCard = ({ userBookings, name, location, image, startDate, endDate, rental, setBookings }) => {
    
    
    const stringToDate = (dateString) => {
        const [datePart, timePart] = dateString.split(' ');

        const [year, month, day] = datePart.split('-').map(Number);
        const [hour, minute, second] = timePart.split(':').map(Number);

        return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    }

    const formatDate = (date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        const dayName = days[date.getUTCDay()];
        const monthName = months[date.getUTCMonth()];
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();

        return `${dayName} ${monthName} ${day} ${year}`
    }

    const handleDelete = () => {
        const currentBooking = userBookings.find(booking => booking.rental_id === rental.id)

        if (!currentBooking) {
            console.error('Booking not found for this rental.')
            return;
        }

        const filteredBookings = userBookings.filter(booking => booking.id !== currentBooking.id);
        setBookings(filteredBookings);

        fetch(`/bookings/${currentBooking.id}`, {
            method: 'DELETE',
        })
        .then(resp => {
            if (!resp.ok && resp.status !== 204) {
                setBookings(userBookings);
                throw new Error('Failed to delete booking');
            }
            
        })
    }

    
    return (<div className='bookingcard'>
        <h2>{name}</h2>
        <div className='image-div'>
            <img src={image} alt='rental'/>
        </div>
        <h3>{location}</h3>
        <p>{`${formatDate(stringToDate(startDate))} to ${formatDate(stringToDate(endDate))}`}</p>
        <button className='bookingbutton' onClick={handleDelete}>Remove Booking</button>
    </div> 
    )
}

export default BookingCard
