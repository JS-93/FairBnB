import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom'


const Logout = ( { onLogout } ) => {
    
    const [isLoggedOut, setIsLoggedOut] = useState(false)

    useEffect(() => {
        onLogout();
        setIsLoggedOut(true);
    }, [onLogout])


    if (isLoggedOut) {
        return <Redirect to='/login'/>;
    }
    return (<h1>Could not log out.</h1>);
}



export default Logout
