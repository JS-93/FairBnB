import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';


const AddRental = () => {
  

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
        .url('Must be a valid URL')
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
            
            <button className='formbutton' type="Submit">Add Rental</button>
            <div className='errors'>
            <p style={{ color: "red" }}> {formik.errors.name}</p>
            <p style={{ color: "red" }}> {formik.errors.location}</p>
            <p style={{ color: "red" }}> {formik.errors.price}</p>
            <p style={{ color: "red" }}> {formik.errors.description}</p>
            <p style={{ color: "red" }}> {formik.errors.image}</p>
            </div>
        </form>
        </div></div>
      )
}


export default AddRental
