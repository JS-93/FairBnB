import React, { useState } from "react";
import { useFormik } from 'formik'
import { Redirect } from 'react-router-dom'

const UpdateDelete = ({ user, onUpdate, onDelete }) => {
    const [message, setMessage] = useState('')

    const handleDelete = () => {
        onDelete()
        fetch(`/users/${user.id}`, {
            method: 'DELETE',

        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Failed to delete user.')
            }
            return resp.json()
        })
        .then(data => {
            setMessage('Deleted successfully!')
            
        })
        .catch(e => console.error('Could not delete user.'))
    }

    const formik = useFormik({
        initialValues: {
            username: '',
        },
        onSubmit: values => {
            fetch(`/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })
            .then(resp => {
                if (!resp.ok) {
                    console.error('Could not update username!')
                    setMessage('Sorry, we cannot update the username at this time.')
                    return;
                } 
                return resp.json();
            })
            .then(user => {
                if(user && user.message) {
                    setMessage('Username updated successfully!')
                    onUpdate(user)
                }
            })
            .catch(e => {
                console.error(e)
            })
        }
    })
    if (!user.id) {
        return <Redirect to='/login'/>;
    }
    return(<div>
        <form onSubmit={formik.handleSubmit}>
            <h3>What would you like your new username to be {user.username}?</h3>
            <input
            type='text'
            name='username'
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder='New Username'
            />
            <button type='submit'>Change</button>
        </form>
        <p>{message}</p>
        <button onClick={handleDelete}>Delete User</button>
    </div>)
}


export default UpdateDelete
