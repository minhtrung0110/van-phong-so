import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '~/redux/reducer/auth/authReducer';
import dashboardReducer from "~/redux/reducer/dashboard/dashboardReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    dashboard:dashboardReducer,
});

export default rootReducer;
