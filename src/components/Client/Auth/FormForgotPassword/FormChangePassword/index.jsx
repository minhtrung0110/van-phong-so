import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import ImageCustom from "~/components/commoms/Image";
import wave from "~/asset/images/wave.png";
import iconBG from "~/asset/images/icon_loginv4.png";
import avatar from "~/asset/images/avatar.svg";
import {FaLock, FaUser} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {message} from "antd";
FormChangePassword.propTypes = {

};

function FormChangePassword(props) {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [isFocusedPass, setIsFocusedPass] = useState(false);
    const [isFocusedConfirmPass, setIsFocusedConfirmPass] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const handleBlurPassWord = (e) => {
        e.target.value === "" && setIsFocusedPass(false)
    }
    const handleBlurConfirmPass = (e) => {
        e.target.value === "" && setIsFocusedConfirmPass(false)
    }
    const onSubmit=(data) => {
    }
    return (
        <div>
            <ImageCustom className="wave" src={wave}/>
            <div className="container-change-password">
                {contextHolder}
                <div className="img">
                    <ImageCustom src={iconBG} className={'bg-icon'}/>
                </div>
                <div className="content">
                    <form className='form-login' onSubmit={handleSubmit(onSubmit)}>
                        <ImageCustom src={avatar} className={'avatar-login'}/>
                        <h2 className="title">QUÊN MẬT KHẨU</h2>
                            <div className={`input-div pass ${isFocusedPass ? 'focus' : ''}`}>
                                <div className="i">
                                    <FaLock className="icon"></FaLock>
                                </div>
                                <div className="div">
                                    <h5 className='title-input'>Mật Khẩu Mới</h5>
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
                            <div className={`input-div con_pass ${isFocusedConfirmPass? 'focus' : ''}`}>
                                <div className="i">
                                    <FaLock className="icon"></FaLock>
                                </div>
                                <div className="div">
                                    <h5 className='title-input'>Nhập Lại Mật Khẩu</h5>
                                    <input type="password" className="input"
                                           onFocus={() => setIsFocusedConfirmPass(true)}
                                           {...register("confirm_password", {
                                               required: 'Vui lòng nhập mật khẩu',
                                               // pattern: {
                                               //     value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                                               //     message: "Mật khẩu chưa đủ độ mạnh"
                                               // },
                                               onBlur: (e) => handleBlurConfirmPass(e)
                                           })}
                                    />
                                </div>
                                {errors.confirm_password && <span className='error'>{errors.confirm_password.message}</span>}
                            </div>

                        <input type="submit" className="btn-save" value="ĐỔI MẬT KHẨU"/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormChangePassword;