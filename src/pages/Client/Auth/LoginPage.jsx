import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {message} from 'antd'
import ImageCustom from "~/components/commoms/Image";
import avatar from '~/asset/images/avatar.svg'
import iconBG from '~/asset/images/icon_loginv4.png'
import wave from '~/asset/images/wave.png'
import {FaLock, FaUser} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {getCookies, handleLogin, setCookies} from "~/api/Client/Auth";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setIsLogin, setUser} from "~/redux/reducer/auth/authReducer";
import {config} from "~/config";

LoginPage.propTypes = {};

function LoginPage(props) {
    const isAuthenticate = () => {
        const token = getCookies('vps_token');
        return !!token;
    }
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [isFocusedPass, setIsFocusedPass] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleBlurEmail = (e) => {
        e.target.value === "" && setIsFocusedEmail(false)
    }
    const handleBlurPassWord = (e) => {
        e.target.value === "" && setIsFocusedPass(false)
    }
    const onSubmit = async (data) => {
        const result = await handleLogin(data);
        console.log('Data received', result)
        if (result.status === 0) {
            //  ErrorToast('Email or password is incorrect. Please try again', 3500);
            //  Notiflix.Block.remove('.sl-box');
            messageApi.open({
                type: 'error',
                content: 'Đăng nhập thất bại ! Thông tin sai',
                duration: 1.60,
                className: 'message-custom-success-message-error'
            });
            return;
        }

        if (result.status === 1) {
            // SuccessToast('Logged in successfully', 2000);
            messageApi.open({
                type: 'success',
                content: 'Đăng nhập thành công',
                duration: 1.45,
                className: 'message-custom-success-message-success'
            });
            setCookies('vps_token', result.data.token, result.data.expire);
            if (!!result.data.user) {
                dispatch(setUser(result.data.user))
                dispatch(setIsLogin(true))
            }
            setTimeout(() => {
                navigate(config.routes.home)
            }, 1400)
            // const response = await handleGetInformation();
            // if (response === 401) {
            //   //  SuccessToast('Error server ... ', 2000);
            //   //  Notiflix.Block.remove('.sl-box');
            // } else {
            //     // if (response.role_id === 2) {
            //     //
            //     // }
            //     if (response.role_id === 2) {
            //         window.location.href = '/admin/warehouse';
            //     }else{
            //         window.location.href = '/admin/';
            //     }
            //     return;
            // }
        }
    }
    /// console.log(errors)
    return (
        <>
            {!isAuthenticate() ? (
                <>
                    <ImageCustom className="wave" src={wave}/>
                    <div className="container-login">
                        {contextHolder}
                        <div className="img">
                            <ImageCustom src={iconBG} className={'bg-icon'}/>
                        </div>
                        <div className="login-content">
                            <form className='form-login' onSubmit={handleSubmit(onSubmit)}>
                                <ImageCustom src={avatar} className={'avatar-login'}/>
                                <h2 className="title">VĂN PHÒNG SỐ</h2>
                                <div className={`input-div one ${isFocusedEmail ? 'focus' : ''}`}>
                                    <div className="i">
                                        <FaUser className="icon"></FaUser>
                                    </div>
                                    <div className="div">
                                        <h5 className='title-input'>Email</h5>
                                        <input type="text" className="input"
                                               onFocus={() => setIsFocusedEmail(true)}

                                               {...register("email", {
                                                   required: "Vui lòng nhập email",
                                                   pattern: {
                                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                       message: "Email không hợp lệ"
                                                   },
                                                   onBlur: (e) => handleBlurEmail(e)
                                               })}
                                        />

                                    </div>
                                    {errors.email && <span className='error'>{errors.email.message}</span>}
                                </div>
                                <div className={`input-div pass ${isFocusedPass ? 'focus' : ''}`}>
                                    <div className="i">
                                        <FaLock className="icon"></FaLock>
                                    </div>
                                    <div className="div">
                                        <h5 className='title-input'>Mật Khẩu</h5>
                                        <input type="password" className="input"
                                               onFocus={() => setIsFocusedPass(true)}
                                               {...register("password", {
                                                   required: 'Vui lòng nhập mật khẩu',
                                                   // pattern: {
                                                   //     value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                                                   //     message: "Mật khẩu chưa đủ độ mạnh"
                                                   // },
                                                   onBlur: (e) => handleBlurPassWord(e)
                                               })}
                                        />
                                    </div>
                                    {errors.password && <span className='error'>{errors.password.message}</span>}
                                </div>
                                <span className='forgot'>Quên Mật Khẩu?</span>
                                <input type="submit" className="btn-login" value="Đăng Nhập"/>
                            </form>
                        </div>
                    </div>
                </>

            ) : (
                <Navigate to={config.routes.home}/>
            )}
        </>

    );
}

export default LoginPage;