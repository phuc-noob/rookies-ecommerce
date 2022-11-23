
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import NotAccessPage from './NotAccessPage';
import { AuthContext } from '../../helpers/context/authContext';
import Loading from '../layout/Loading';


const UserRouteRole = ({ children }) => {
    const {authState: { user,authLoading },
    } = useContext(AuthContext);
        if(authLoading) return <div style={{minHeight:500}}><Loading/></div>
    
    console.log(user)
    if (user && user.roleName.includes("ROLE_USER")) {
      
        return <>{children}</>
    } else {
      
        return <NotAccessPage />
    }
}

export default UserRouteRole;