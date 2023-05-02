import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {getCookies} from "~/api/Client/Auth";
import {config} from "~/config";
// import { checkLogin } from '../../api/Auth';

export function AuthRouter(props) {
    const isAuthenticate =()=> {
        const token  =getCookies('vps_token');
        return !!token;
    }
  // console.log('Login', isAuthenticate());
    return isAuthenticate() ? <Outlet /> : <Navigate to={config.routes.login} />;
}
