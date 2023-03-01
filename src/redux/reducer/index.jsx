import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '~/redux/reducer/auth/authReducer';
import dashboardReducer from "~/redux/reducer/dashboard/dashboardReducer";
import staffReducer from "~/redux/reducer/staff/staffReducer";
import taskReducer from "~/redux/reducer/task/taskReducer";
import departmentReducer from "~/redux/reducer/department/departmentReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    dashboard:dashboardReducer,
    staff:staffReducer,
    task:taskReducer,
    department:departmentReducer,
});

export default rootReducer;
