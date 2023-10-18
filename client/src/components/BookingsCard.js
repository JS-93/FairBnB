import React from "react";


const BookingCard = ({ userBookings, name, location, price, description, image, startDate, endDate, rental, setBookings }) => {

    const handleDelete = () => {
        const currentBooking = userBookings.find(booking => booking.rental_id === rental.id)

        if (!currentBooking) {
            console.error('Booking not found for this rental.')
            return;
        }

        const filteredBookings = userBookings.find(booking => booking.rental_id !== rental.id);
        setBookings(filteredBookings);

        fetch(`/bookings/${currentBooking.id}`, {
            method: 'DELETE',
        })
        .then(resp => {
            if (!resp.ok) {
                setBookings(userBookings);
                throw new Error('Failed to delete booking');
            }
            return resp.json();
        })
        .then(data => {
            
        })
        .catch(e => console.error('Could not delete booking.'))
    }
    return (<div>
        <h2 className='name-div'>{name}</h2>
        <div className='image-div'>
            <img src={image} alt='rental'/>
        </div>
        <h3 className='price'>{price}</h3>
        <h3 className='location'>{location}</h3>
        <div className='description-div'>
            <p>{description}</p>
        </div>
        <p>{`${startDate} to ${endDate}`}</p>
        <button onClick={handleDelete}>Remove Booking</button>
    </div>)
}

export default BookingCard
