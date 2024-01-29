import React, {useState, useEffect} from "react";
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const RentalCard = ({ rental, name, location, description, image, user, price }) => {
    console.log(image)
        const [message, setMessage] = useState('')
        const [bookedDates, setBookedDates] = useState([])
        console.log(rental)
       

        const parseDate = (dateStr) => {
            return new Date(dateStr.replace(' ', 'T'));
        }
        
        const getDatesBetween = (startDate, endDate) => {
            const dates = [];
            let currentDate = startDate;
            while (currentDate <= endDate) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return dates;
        }
        
        useEffect(() => {
            fetch(`/bookings/${rental.id}`)
            .then(resp => resp.json())
            .then(data => {

                
                const allBookedDates = [];
                data.forEach(booking => {
                    const start = parseDate(booking.start_date);
                    const end = parseDate(booking.end_date);
                    const bookedDatesForThisBooking = getDatesBetween(start, end);
                    allBookedDates.push(...bookedDatesForThisBooking);
                });
                setBookedDates(allBookedDates)
            })
        }, [rental.id])
        
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

            const newBookedDates = getDatesBetween(values.startDate, values.endDate)
            setBookedDates(prevDates => [...prevDates, ...newBookedDates]);
            

            fetch('/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBooking),
            })
            .then(resp => resp.json())
            .then(data => {
                
                if (data) {
                    formik.setFieldValue('startDate', '');
                    formik.setFieldValue('endDate', '')
                    formik.resetForm();
                    setMessage(`Rental Booked!!!`)
                } 
            })
            .catch(e => {
                console.error(e);
                setBookedDates(prevDates => prevDates.filter(date => !newBookedDates.includes(date)))
            })
            
        }
       })
        
       
    return (<div className='card'>
        <h2 className='name-div'>{name}</h2>
        <div className='image-div'>
            <img src={image} alt='rental'/>
        </div>
        <h3 className='location'>{location}</h3>
        <h4>{`$${price} Per Night`}</h4>
        <div className='description-div'>
            <p>{description}</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
        <div className='date-select'>
            <div className="dateSelect">

            <span>Start Date:</span>
            <DatePicker
            selected={formik.values.startDate}
            onChange={date => formik.setFieldValue('startDate', date)}
            selectsStart
            endDate={formik.values.endDate}
            minDate={formik.values.startDate ? formik.values.startDate : new Date()}
            placeholderText='Select start date'
            excludeDates={bookedDates}
            />
            </div>
            <div className="dateSelect">

            <span>End Date:</span>
            <DatePicker
            selected={formik.values.endDate}
            onChange={date => formik.setFieldValue('endDate', date)}
            selectsEnd
            startDate={formik.values.startDate}
            endDate={formik.values.endDate}
            minDate={formik.values.startDate ? formik.values.startDate : new Date()}
            placeholderText='Select end date'
            excludeDates={bookedDates}
            />
            </div>
        </div>
        <button className='cardbutton' type='submit'>Book Now</button>
        </form>
        <p>{message}</p>
    </div>)
}

export default RentalCard
