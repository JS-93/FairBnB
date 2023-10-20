import React, { useState } from "react";
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'

const Signup = () => {
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [error, setError] = useState('')

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
        .required('Please fill out both fields.'),
        password: Yup.string()
        .required('Password is required.')
    })
    
    
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            .then(resp => {
                return resp.json()
                .then(data => {
                    if (!resp.ok) {
                        
                        if(data.message === 'Username already taken.') {
                            setError('Please pick a new username.');
                            setIsSignedUp(false);
                        } else {
                            setError('Please pick a new username, this one is taken.');
                        }
                    } else {
                        setIsSignedUp(true)
                        
                    }
                });
            })
            .catch(e => console.error(e))
        }
    })
    
    return (
        <div className='signupbackground'>
        <div className='signup'>  
        <h1>Sign up</h1>
        <form onSubmit={formik.handleSubmit}>
            <input
                type='text'
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder='Type in username'
                />
            <input
                type='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder='Type in password'
                />
            <button type='submit'>Sign up</button>
        </form><p style={{ color: 'red' }}>{error}</p>
        <p style={{ color: 'red' }}>{formik.errors.username} {formik.errors.password}</p>
        {isSignedUp && <Link to='/login' className='thankstag'>Thanks for signing up! Click here to login.</Link>}
    </div></div>
)
}


export default Signup

