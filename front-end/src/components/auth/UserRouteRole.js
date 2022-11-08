
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import NotAccessPage from './NotAccessPage';
import { AuthContext } from '../../helpers/context/authContext';


const UserRouteRole = ({ children }) => {
    const {authState: { user },
    } = useContext(AuthContext);
    
    console.log(user)
    if (user && user.roleName.includes("ROLE_USER")) {
      
        return <>{children}</>
    } else {
      
        return <NotAccessPage />
    }
}

export default UserRouteRole;