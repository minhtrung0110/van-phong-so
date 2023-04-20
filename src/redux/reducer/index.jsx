import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '~/redux/reducer/auth/authReducer';
import dashboardReducer from "~/redux/reducer/dashboard/dashboardReducer";
import staffReducer from "~/redux/reducer/staff/staffReducer";
import projectReducer from "~/redux/reducer/project/projectReducer";
import departmentReducer from "~/redux/reducer/department/departmentReducer";
import decentralizeReducer from "~/redux/reducer/decentralize/decentralizeReducer";
import postReducer from "~/redux/reducer/post/postReducer";
import groupReducer from "~/redux/reducer/group/groupReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    dashboard:dashboardReducer,
    staff:staffReducer,
    project:projectReducer,
    department:departmentReducer,
    group:groupReducer,
    decentralize:decentralizeReducer,
    post:postReducer,

});

export default rootReducer;
