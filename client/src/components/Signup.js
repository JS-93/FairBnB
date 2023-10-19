import React, { useState } from "react";
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';


const Signup = () => {
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [error, setError] = useState('')
    
    
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
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
                            setError('Please fill out both fields or pick a new username.');
                            setIsSignedUp(false);
                        } else {
                            setError('Please pick a new username or fill out both fields.');
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
                type='text'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder='Type in password'
                />
            <button type='submit'>Sign up</button>
        </form><p>{error}</p>
        {isSignedUp && <Link to='/login'>Thanks for signing up! Click here to login.</Link>}
    </div></div>
)
}


export default Signup

