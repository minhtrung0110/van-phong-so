import React, { useEffect } from 'react';
import {useDispatch} from "react-redux";
import {Route, Routes} from "react-router-dom";
import * as PropTypes from "prop-types";
import LoginPage from "~/pages/Admin/LoginPage";

function ProtectedRoutes(props) {
    return null;
}

ProtectedRoutes.propTypes = {
    isAuthenticate: PropTypes.any,
    userRole: PropTypes.any
};

function AdminRouter(props) {
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
                <Route path="/admin/login" element={<LoginPage />} />
                {/*<Route element={<ProtectedRoutes isAuthenticate={isAuthenticate} userRole={user} />}>*/}
                {/*    /!* {user && user.role_id === 1 && ( *!/*/}
                {/*    <>*/}
                {/*        /!* <Route element={<RoleAdminRoutes userRole={1} />}> *!/*/}
                {/*        /!*<Route path="/admin" element={<AdminLayout slot={<DashBoardPage key={'a'} role={1} />} />} />*!/*/}
                {/*        /!*<Route path="/admin/product" element={<AdminLayout slot={<ProductPage key={'1'} role={2} />} />} />*!/*/}

                {/*    </>*/}
                {/*</Route>*/}
            </Routes>
        );


}

export default AdminRouter;