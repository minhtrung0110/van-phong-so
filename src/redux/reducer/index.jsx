import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '~/redux/reducer/auth/authReducer';
import dashboardReducer from "~/redux/reducer/dashboard/dashboardReducer";
import staffReducer from "~/redux/reducer/staff/staffReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    dashboard:dashboardReducer,
    staff:staffReducer,
});

export default rootReducer;
