import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ImageCustom from "~/components/commoms/Image";
import wave from "~/asset/images/wave.png";
import iconBG from "~/asset/images/bg_login_client.svg";
import avatar from "~/asset/images/avatar.svg";
import {FaUser} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {message} from "antd";
import './style.scss'
import {senMailOTP} from "~/api/Client/Auth";
FormEmail.propTypes = {

};

function FormEmail({onIsmail}) {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const onSubmit=async (data) => {
        const result = await senMailOTP(data)
        console.log('Data received', result)
        if (result.status === 0) {
            //  ErrorToast('Email or password is incorrect. Please try again', 3500);
            //  Notiflix.Block.remove('.sl-box');
            messageApi.open({
                type: 'error',
                content: 'Thông tin sai! Email không tồn tại',
                duration: 1.40,
                className: 'message-custom-success-message-error'
            });
            onIsmail(false)
        }
        else if (result.status === 1) {
                // SuccessToast('Logged in successfully', 2000);
                messageApi.open({
                    type: 'success',
                    content: 'Gửi Mã OTP Thành Công',
                    duration: 1.45,
                    className: 'message-custom-success-message-success'
                });
                onIsmail(true)

        }

    }
    const handleBlurEmail = (e) => {
        e.target.value === "" && setIsFocusedEmail(false)
    }
    return (
        <div>
            <ImageCustom className="wave" src={wave}/>
            <div className="container-email-login">
                {contextHolder}
                <div className="img">
                    <ImageCustom src={iconBG} className={'bg-icon'}/>
                </div>
                <div className="content">
                    <form className='form-email' onSubmit={handleSubmit(onSubmit)}>
                        <ImageCustom src={avatar} className={'avatar-login'}/>
                        <h2 className="title">QUÊN MẬT KHẨU</h2>
                        <div className={`input-div one ${isFocusedEmail ? 'focus' : ''}`}>
                            <div className="i">
                                <FaUser className="icon"></FaUser>
                            </div>
                            <div className="div">
                                <h5 className='title-input'>Email</h5>
                                <input type="text" className="input"
                                       onFocus={() => setIsFocusedEmail(true)}

                                       {...register("email", {
                                           required: "Vui lòng nhập email xác thực",
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

                        <input type="submit" className="btn-send" value="Gửi Mã Xác Thực"/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormEmail;