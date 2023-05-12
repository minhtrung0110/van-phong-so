import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ImageCustom from "~/components/commoms/Image";
import wave from "~/asset/images/wave.png";
import iconBG from "~/asset/images/icon_loginv4.png";
import avatar from "~/asset/images/avatar.svg";
import {FaUser} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {message} from "antd";
import OtpInput from 'react-otp-input';
import {senMailOTP} from "~/api/Client/Auth";
import './style.scss'
import {isEmpty} from "lodash";
FormOTP.propTypes = {

};

function FormOTP({onCorrectOTP}) {
    const [otp,setOTP] = useState(false)
    const [error,setError]=useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const onSubmit=async () => {
        if(isEmpty(otp)) setError(true)
        else setError(false)
        const result = await senMailOTP(otp)
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
            onCorrectOTP(false)
        }
        else if (result.status === 1) {
            // SuccessToast('Logged in successfully', 2000);
            messageApi.open({
                type: 'success',
                content: 'Gửi Mã OTP Thành Công',
                duration: 1.45,
                className: 'message-custom-success-message-success'
            });
            onCorrectOTP(true)

        }

    }

    return (
        <div>
            <ImageCustom className="wave" src={wave}/>
            <div className="auth-otp">
                {contextHolder}
                <div className="img">
                    <ImageCustom src={iconBG} className={'bg-icon'}/>
                </div>
                <div className="content">
                    <div className='form-otp' >
                        <ImageCustom src={avatar} className={'avatar-login'}/>
                        <h2 className="title">QUÊN MẬT KHẨU</h2>
                        <OtpInput
                            value={otp}
                            onChange={setOTP}
                            numInputs={6}
                            containerStyle={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            renderSeparator={<span> - </span>}
                            renderInput={(props) => <input {...props} className={'input-otp'}
                            />}
                        />
                {!!error && <span className='error'>{'Vui lòng nhập mã xác thực !'}</span>}
                        <input type="submit" className="btn-send" onClick={onSubmit} value="Xác Thực"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormOTP;