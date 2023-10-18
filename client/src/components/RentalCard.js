import React, {useState} from "react";
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'


const RentalCard = ({ rental, name, location, description, image, user }) => {
        const [message, setMessage] = useState('')
        
       const formik = useFormik({
        initialValues: {
            startDate: null,
            endDate: null,
        },
        onSubmit: values => {
            if (!values.startDate || !values.endDate) {
                setMessage('Please select both start and end dates.')
                return;
            }
            const newBooking = {
                rental_id: rental.id,
                user_id: user.id,
                start_date: values.startDate.toISOString(),
                end_date: values.endDate.toISOString(),
            };
            console.log(newBooking)

            fetch('/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBooking),
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.success) {
                    formik.resetForm();
                    setMessage(`Rental Booked for ${values.startDate} to ${values.endDate}`)
                } 
            })
            .catch(e => console.error(e))
        }
       })
        
       
    return (<div>
        <h2 className='name-div'>{name}</h2>
        <div className='image-div'>
            <img src={image} alt='rental'/>
        </div>
        <h3 className='location'>{location}</h3>
        <div className='description-div'>
            <p>{description}</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
        <div className='date-select'>
            <span>Start Date:</span>
            <DatePicker
            selected={formik.values.startDate}
            onChange={date => formik.setFieldValue('startDate', date)}
            selectsStart
            endDate={formik.values.endDate}
            placeholderText='Select start date'
            />
            <span>End Date:</span>
            <DatePicker
            selected={formik.values.endDate}
            onChange={date => formik.setFieldValue('endDate', date)}
            selectsEnd
            startDate={formik.values.startDate}
            endDate={formik.values.endDate}
            minDate={formik.values.startDate}
            placeholderText='Select end date'
            />
        </div>
        <button>Availability</button>
        <button type='submit'>Book Now</button>
        </form>
        <p>{message}</p>
    </div>)
}

export default RentalCard
