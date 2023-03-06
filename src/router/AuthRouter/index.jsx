// Check login authentication

import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// { checkLogin } from '../../adapter/auth';
// import { checkLogin } from '../../api/Auth';

export function AuthRouter(props) {
    const isAuthenticate = false;//checkLogin();
   // console.log('use', props.userRole.role_id);
    return isAuthenticate ? <Outlet /> : <Navigate to="/login" />;
}
