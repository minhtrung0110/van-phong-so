import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import * as PropTypes from "prop-types";
import {AuthRouter} from "~/router/AuthRouter";
import ClientLayout from "~/layouts/Client";
import ManageTaskPage from "~/pages/Client/ManageTask";
import ManageSchedule from "~/pages/Client/ManageSchedule";
import ManageMeeting from "~/pages/Client/ManageMeeting";
import ManageStaff from "~/pages/Client/ManageStaff";
import Overview from "~/pages/Client/Overview";
import Profile from "~/pages/Client/Profile";
import NotificationsPage from "~/pages/Client/Notifications";
import {config} from "~/config";
import ManageDepartment from "~/pages/Client/ManageDepartment";
import LoginPage from "~/pages/Client/Auth/LoginPage";
import {getUserSelector, isLoginSelector} from "~/redux/selectors/auth/authSelector";
import {deleteCookie, getCookies, handleVerifyUserLogin} from "~/api/Client/Auth";
import {setIsLogin, setUser} from "~/redux/reducer/auth/authReducer";

function ProtectedRoutes(props) {
    return null;
}

ProtectedRoutes.propTypes = {
    isAuthenticate: PropTypes.any,
    userRole: PropTypes.any
};

function ClientRouter(props) {
    const dispatch = useDispatch();
    const isAuthenticate = useSelector(isLoginSelector);
    useEffect(() => {
        handleVerifyUserLogin().then((result) => {
            if (result === 401) {
                const token = getCookies('token');
                dispatch(setIsLogin(false));
                if (token) {
                    deleteCookie('token');
                }
            } else {
                dispatch(setIsLogin(true));
                dispatch(setUser(result));

            }
        });
    }, [dispatch]);
    const user = useSelector(getUserSelector);
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            {/* Requỉed login */}
            <Route element={<AuthRouter/>}>
                <Route path={config.routes.overview} element={<ClientLayout slot={<Overview key={'a'}/>}/>}/>
                <Route path={config.routes.task} element={<ClientLayout slot={<ManageTaskPage key={'a'}/>}/>}/>
                <Route path={config.routes.addProject} element={<ClientLayout slot={<ManageTaskPage key={'a'}/>}/>}/>
                <Route path={config.routes.schedule} element={<ClientLayout slot={<ManageSchedule key={'a'}/>}/>}/>
                <Route path={config.routes.meeting} element={<ClientLayout slot={<ManageMeeting key={'a'}/>}/>}/>
                <Route path={config.routes.staff} element={<ClientLayout slot={<ManageStaff key={'a'}/>}/>}/>
                <Route path={config.routes.department} element={<ClientLayout slot={<ManageDepartment key={'a'}/>}/>}/>
                <Route path={config.routes.profile} element={<ClientLayout slot={<Profile key={'a'}/>}/>}/>
                <Route path={config.routes.notification} element={<ClientLayout slot={<NotificationsPage key={'a'}/>}/>}/>


            </Route>
        </Routes>
    );


}

export default ClientRouter;