import React from "react";
import { useState } from 'react'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';


const AddRental = () => {
    const [success, setSuccess] = useState(false);
  

    const RentalSchema = Yup.object().shape({
        name: Yup.string()
        .required('Name is required'),
        location: Yup.string()
        .required('Location is required'),
        price: Yup.number().positive().integer().max(300)
        .typeError('Price must be a number.')
        .required('Price is required'),
        description: Yup.string()
        .required('Description is required'),
        image: Yup.string()
        .required('Image URL is required')
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            location: '',
            price: '',
            description: '',
            image: '',
        },
        validationSchema: RentalSchema,
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
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 3000)
                formik.resetForm();
            })
            .catch(e => console.error(e));
        }
        
    })
    return(<div className='formbackground'><div className='formcontainer'>
        <h1 className='formtitle'>Add Rental Here</h1>
        <form className='addform' onSubmit={formik.handleSubmit}>
            <input
                type='text'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder='Name of Rental'
            />
             <p className="error" style={{ color: "red" }}> {formik.errors.name}</p>
            
            <input
                type='text'
                name='location'
                value={formik.values.location}
                onChange={formik.handleChange}
                placeholder='Name of Location'
            />
             <p className="error1" style={{ color: "red" }}> {formik.errors.location}</p>
            
             <input
                type='integer'
                name='price'
                value={formik.values.price}
                onChange={formik.handleChange}
                placeholder='Amount per night'
            />
            <p className="error2" style={{ color: "red" }}> {formik.errors.price}</p>
           
             <textarea
                type='text'
                name='description'
                className="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder='Description of property'
            />
            <p className="error3" style={{ color: "red" }}> {formik.errors.description}</p>
           
            
             <input
                type='text'
                name='image'
                value={formik.values.image}
                onChange={formik.handleChange}
                placeholder='URL of Image'
            />
               <p className="error4" style={{ color: "red" }}> {formik.errors.image}</p>
            <button className='formbutton' type="Submit">Add Rental</button>
            {success && <p className="success">New rental added!</p>}
            
        </form>
        </div></div>
      )
}


export default AddRental
