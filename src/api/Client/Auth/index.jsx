import {useDispatch} from 'react-redux';
import axiosClient from "~/api/axiosClient";
import jwt from 'jwt-decode'

export const setCookies = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};
export const getCookies = (cname) => {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie) {
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
    }

    return '';
};
export const deleteCookie = (name) => {
    document.cookie = setCookies(name, '', -1);
};
export const configHeadersAuthenticate = () => {
    const token = getCookies('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const handleLogin = async (body) => {
    const url = 'login';
    // const response = await axios.post('http://127.0.0.1:8080/api/v1/login', body)
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    const response = await axiosClient.post(url, body)
    const token = response.data.result.token
    const decodedToken = jwt(token);
    return {...response,data:{user:decodedToken.user,token,expire:decodedToken.exp,created:decodedToken.iat}}
};
export const handleVerifyUserLogin = async () => {
    const response = await axiosClient.get('api/admin/me', configHeadersAuthenticate());
    if (response.status === 401) {
        return 401;
    }
    if (response.status === 'success') {
        return response.data;
    }
};

export const logout = async () => {
    const response = await axiosClient.post('api/admin/logout', {}, configHeadersAuthenticate());
    const {status} = response;
    switch (status) {
        case 'success':
            //SuccessToast('Logout successfully', 1000);
            return 200;
            break;
        case 401:
            //  Notiflix.Block.remove('.modal-content');
            return 401;
        default:
            //  ErrorToast(3500, 'Server error. Please try again');
            //  Notiflix.Block.remove('.modal-content');
            return 500;
    }
};

export const senMailOTP = async (body) => {
    const response = await axiosClient.post('api/admin/otp-sendmail', body);
    if (response.status === 200) {
        return 200;
    } else if (response.status === 404) {
        return 404;
    } else if (response.status === 400) {
        return 400;
    }
};

export const forgotPassword = async (body) => {
    const response = await axiosClient.put('api/admin/forgot-password', body);
    if (response.status === 'success') {
        return 200;
    } else {
        return 403;
    }
};
