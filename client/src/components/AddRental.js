import React from "react";
import { useFormik } from 'formik';



const AddRental = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            location: '',
            price: '',
            description: '',
            image: '',
        },
        onSubmit: values => {

            const newRental = {
                name: values.name,
                location: values.location,
                price: values.price,
                description: values.description,
                image: values.image,
            };
            fetch('/rentals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRental),
            })
            .then(resp => resp.json())
            .then(data => {
                formik.resetForm();
            })
            .catch(e => console.error(e));
        }
        
    })
    return(<div>
        <h1>Add Rental Here</h1>
        <form onSubmit={formik.handleSubmit}>
            <input
                type='text'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder='Name of Rental'
            />
            <input
                type='text'
                name='location'
                value={formik.values.location}
                onChange={formik.handleChange}
                placeholder='Name of Location'
            />
             <input
                type='integer'
                name='price'
                value={formik.values.price}
                onChange={formik.handleChange}
                placeholder='Amount per night'
            />
             <textarea
                type='text'
                name='description'
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder='Description of property'
            />
             <input
                type='text'
                name='image'
                value={formik.values.image}
                onChange={formik.handleChange}
                placeholder='URL of Image'
            />
            <button type="Submit">Add Rental</button>
        </form>
    </div>)
}


export default AddRental
