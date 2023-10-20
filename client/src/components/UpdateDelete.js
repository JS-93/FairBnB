import React, { useState } from "react";
import { useFormik } from 'formik';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';

const UpdateDelete = ({ user, onUpdate, onDelete }) => {
    const [message, setMessage] = useState('')
    const [confirmation, setConfirmation] = useState(false)
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

    const UpdateSchema = Yup.object().shape({
        username: Yup.string()
        .required("Username can't be blank.")
    })


    const formik = useFormik({
        initialValues: {
            username: '',
        },
        validationSchema: UpdateSchema,
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
                    setMessage('Sorry, this username is already taken.')
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
    const promptDelete = () => {
        setConfirmation(true);
    };



    return (
        <>
        {!confirmation &&
            <div className='updatebackground'>
                <div className='updatecontainer'>
                    <form className='updateform' onSubmit={formik.handleSubmit}>
                        <h3>Type in Your New Username Below</h3>
                        <input
                            type='text'
                            name='username'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            placeholder='New Username'
                        />
                        <button className='changebutton' type='submit'>Change</button>
                    </form>
                    <p>{message} Your new username is now {user.username}.</p>
                
                    <button className='deletebutton' onClick={promptDelete}>Delete User</button>
                    <p style={{ color: 'red' }}>{formik.errors.username}</p>
                </div>
            </div>}
    
            {confirmation && (<div className='returnwindowcontainer'>
                <div className='returnwindow'>
                    <p>Are you sure you want to delete the user? You will be logged out immediately if you click yes and all your bookings will be removed.</p>
                    <button className='yes' onClick={() => handleDelete()}>YES</button>
                    <button className='no' onClick={() => setConfirmation(false)}>NO</button>
                </div></div>
            )}
        </>
    );
}


export default UpdateDelete
