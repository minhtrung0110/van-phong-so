import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Route, Routes} from "react-router-dom";
import * as PropTypes from "prop-types";
import LoginPage from "~/pages/Client/LoginPage";
import {AuthRouter} from "~/router/AuthRouter";
import ClientLayout from "~/layouts/Client";
import ManageTaskPage from "~/pages/Client/ManageTask";
import ManageSchedule from "~/pages/Client/ManageSchedule";
import ManageMeeting from "~/pages/Client/ManageMeeting";
import ManageStaff from "~/pages/Client/ManageStaff";
import Overview from "~/pages/Client/Overview";

function ProtectedRoutes(props) {
    return null;
}

ProtectedRoutes.propTypes = {
    isAuthenticate: PropTypes.any,
    userRole: PropTypes.any
};

function ClientRouter(props) {
    // const dispatch = useDispatch();
    // const isAuthenticate = useSelector(isLoginSelector);
    // useEffect(() => {
    //     handleGetMe().then((result) => {
    //         if (result === 401) {
    //             const token = getCookies('token');
    //             dispatch(setIsLogin(false));
    //             if (token) {
    //                 deleteCookie('token');
    //             }
    //         } else {
    //             dispatch(setIsLogin(true));
    //             dispatch(setUser(result));
    //
    //         }
    //     });
    // }, [dispatch]);
    // const user = useSelector(getUserSelector);
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            {/* Requỉed login */}
            <Route element={<AuthRouter/>}>
                <Route path="/" element={<ClientLayout slot={<Overview key={'a'}/>}/>}/>
                <Route path="/task" element={<ClientLayout slot={<ManageTaskPage key={'a'}/>}/>}/>
                <Route path="/schedule" element={<ClientLayout slot={<ManageSchedule key={'a'}/>}/>}/>
                <Route path="/meeting" element={<ClientLayout slot={<ManageMeeting key={'a'}/>}/>}/>
                <Route path="/staff" element={<ClientLayout slot={<ManageStaff key={'a'}/>}/>}/>


            </Route>
        </Routes>
    );


}

export default ClientRouter;