export const isLoginSelector = (state) => state.auth.isLogin;
export const exPiredTokenSelector = (state) => state.auth.expiredToken;
export const getUserSelector = (state) => state.auth.user;
export const isForgotPasswordSelector = (state) => state.auth.isForgotPassword;
export const isForgotPasswordVerifiedSelector = (state) => state.auth.isForgotPasswordVerification;
export const emailForgotSelector = (state) => state.auth.emailForgot;
// Client
export const isLoginClientSelector = (state) => state.auth.isLoginClient;
export const isForgotPasswordSelectorClient = (state) => state.auth.isForgotPasswordClient;
export const isForgotPasswordVerifiedSelectorClient = (state) => state.auth.isForgotPasswordVerificationClient;
export const emailForgotSelectorClient = (state) => state.auth.emailForgotClient;
export const getClientSelector = (state) => state.auth.client;
