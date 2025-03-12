
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import NotAccessPage from './NotAccessPage';
import { AuthContext } from '../../helpers/context/AuthContext';
import Loading from '../layout/Loading';

const AdminRouteRole = ({ children }) => {
    const {authState: { user,authLoading },
    } = useContext(AuthContext);
    if(authLoading) return <div style={{minHeight:500}}><Loading/></div>
    if (user && user.roleName.includes("ROLE_ADMIN")) {
      
        return <>{children}</>
    } else {
      
        return <NotAccessPage />
    }
}

export default AdminRouteRole;