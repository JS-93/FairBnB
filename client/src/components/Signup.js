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
                if (!resp.ok) {
                    setError('Failed to sign up. Please try Again!')
                    console.error("Can't sign up")
                    
                }
                return resp.json();
            })
            .then(user => {
                if(user) {
                    setIsSignedUp(true)
                }
            })
            .catch(e=> console.error(e))
        }
    })
    
    return (
        
        <div>
            
            {error && <div>{error}</div>}
            
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
        </form>
        {isSignedUp && <Link to='/login'>Go To Login</Link>}
    </div>
)
}


export default Signup

// const [users, setUsers] = useState(null)

// useEffect(() => {
//     fetch('/users')
//     .then(resp => {
//         if (!resp.ok) {
//             throw new Error(`HTTP error! Status ${resp.status}`)
//         }
//         return resp.json();
//     })
//     .then(data => {
//         setUsers(data)
//         console.log(data)
//     })
//     .catch(e => console.error(e))
// }, [])
