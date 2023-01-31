import { createSlice } from '@reduxjs/toolkit';

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        key: 0,
        isLogin: false,
        isLoginClient: false,
        expiredToken: false,
        isForgotPassword: false,
        isForgotPasswordVerification: false,
        isForgotPasswordClient: false,
        isForgotPasswordVerificationClient: false,
        user: {},
        client: {},
        emailForgot: '',
        emailForgotClient: '',
    },
    reducers: {
        setKey: (state, action) => {
            state.key = action.payload;
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setExpiredToken: (state, action) => {
            state.expiredToken = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsForgotPassword: (state, action) => {
            state.isForgotPassword = action.payload;
        },
        setIsForgotPasswordVerification: (state, action) => {
            state.isForgotPasswordVerification = action.payload;
        },
        setEmailForgot: (state, action) => {
            state.emailForgot = action.payload;
        },
        setIsForgotPasswordClient: (state, action) => {
            state.isForgotPasswordClient = action.payload;
        },
        setIsForgotPasswordVerificationClient: (state, action) => {
            state.isForgotPasswordVerificationClient = action.payload;
        },
        setEmailForgotClient: (state, action) => {
            state.emailForgotClient = action.payload;
        },
        // Client
        setClient: (state, action) => {
            state.client = action.payload;
        },
        setIsLoginClient: (state, action) => {
            state.isLoginClient = action.payload;
        },
    },
});

export const {
    setIsLogin,
    setExpiredToken,
    setUser,
    setIsForgotPassword,
    setIsForgotPasswordVerification,
    setEmailForgot,
    setIsForgotPasswordClient,
    setIsForgotPasswordVerificationClient,
    setEmailForgotClient,
    setClient,
    setIsLoginClient,
} = authReducer.actions;

export default authReducer.reducer;
