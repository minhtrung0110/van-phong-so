import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '~/redux/reducer/auth/authReducer';


const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
